import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import Ajv from 'ajv';

import { JsonClassLoader } from '../classes/json/JsonClassLoader';
import { BaseClassesMap } from '../classes/AvailableClasses';

const resourcesDir = path.join(__dirname, '..', '..', 'resources', 'classes');
const schemaPath = path.join(__dirname, '..', '..', 'resources', 'schema', 'acl-class-definition.schema.json');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

describe('ACL JSON + JsonClassLoader integration', () => {
    let loader: JsonClassLoader;

    beforeEach(() => {
        loader = new JsonClassLoader();
    });

    describe('JSON Schema validation', () => {
        it('should find resources/classes directory', () => {
            assert.ok(
                fs.existsSync(resourcesDir),
                `Resources directory should exist: ${resourcesDir}`
            );
        });

        it('should have JSON files in resources/classes', () => {
            if (!fs.existsSync(resourcesDir)) {
                throw new Error(`Resources directory does not exist: ${resourcesDir}`);
            }

            const files = fs.readdirSync(resourcesDir);
            const jsonFiles = files.filter(f => f.endsWith('.json'));

            assert.ok(
                jsonFiles.length > 0,
                'Should have at least one JSON file in resources/classes'
            );
            console.log(`Found ${jsonFiles.length} JSON files to validate`);
        });

        it('should validate all JSON files against ACL schema', () => {
            if (!fs.existsSync(resourcesDir)) {
                throw new Error(`Resources directory does not exist: ${resourcesDir}`);
            }

            const files = fs.readdirSync(resourcesDir);
            const jsonFiles = files.filter(f => f.endsWith('.json'));

            const ajv = new Ajv({ allErrors: true });
            const validate = ajv.compile(schema as any);

            const errors: string[] = [];

            for (const file of jsonFiles) {
                const filePath = path.join(resourcesDir, file);
                const raw = fs.readFileSync(filePath, 'utf8');

                let json: unknown;
                try {
                    json = JSON.parse(raw);
                } catch (err) {
                    const msg = err instanceof Error ? err.message : String(err);
                    errors.push(`${file}: invalid JSON syntax: ${msg}`);
                    continue;
                }

                const valid = validate(json);
                if (!valid) {
                    const parts = (validate.errors ?? []).map(err => {
                        const dataPath = (err as any).instancePath || (err as any).schemaPath || err.schema;
                        return `${dataPath}: ${err.message}`;
                    });
                    errors.push(
                        `${file}: schema validation failed:\n  ${parts.join('\n  ')}`
                    );
                }
            }

            if (errors.length > 0) {
                assert.fail(
                    `Schema validation failed for ${errors.length} JSON file(s):\n\n${errors.join(
                        '\n\n'
                    )}`
                );
            }
        });
    });

    describe('JsonClassLoader integration', () => {
        it('should load all classes from resources/classes without warnings', () => {
            if (!fs.existsSync(resourcesDir)) {
                throw new Error(`Resources directory does not exist: ${resourcesDir}`);
            }

            const files = fs.readdirSync(resourcesDir);
            const jsonFiles = files.filter(f => f.endsWith('.json'));
            const expectedClassNames = new Map<string, string>();
            const filesWithoutName: string[] = [];
            const filesWithParseErrors: Array<{ file: string; error: string }> = [];

            for (const file of jsonFiles) {
                const filePath = path.join(resourcesDir, file);
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    const json = JSON.parse(content);
                    if (json.name && typeof json.name === 'string') {
                        if (expectedClassNames.has(json.name)) {
                            console.warn(`Duplicate class name '${json.name}' found in ${file} (already in ${expectedClassNames.get(json.name)})`);
                        }
                        expectedClassNames.set(json.name, file);
                    } else {
                        filesWithoutName.push(file);
                    }
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    filesWithParseErrors.push({ file, error: errorMessage });
                }
            }

            if (filesWithoutName.length > 0) {
                console.warn(`Files without 'name' field: ${filesWithoutName.join(', ')}`);
            }
            if (filesWithParseErrors.length > 0) {
                console.warn(`Files with parse errors: ${filesWithParseErrors.map(f => `${f.file}: ${f.error}`).join(', ')}`);
            }

            const originalWarn = console.warn;
            const originalError = console.error;
            const warnings: string[] = [];
            const errors: string[] = [];
            
            console.warn = (...args: any[]) => {
                const message = args.map(String).join(' ');
                warnings.push(message);
                if (message.includes('Component')) {
                    console.log(`[WARN] ${message}`);
                }
            };
            
            console.error = (...args: any[]) => {
                const message = args.map(String).join(' ');
                errors.push(message);
                if (message.includes('Component')) {
                    console.log(`[ERROR] ${message}`);
                }
            };

            try {
                const classes = loader.loadFromDirectory(resourcesDir, BaseClassesMap);
                assert.ok(
                    classes.size > 0,
                    'Should load at least one class (including base classes)'
                );

                for (const [name, cls] of BaseClassesMap) {
                    assert.ok(
                        classes.has(name),
                        `Base class ${name} should be in loaded classes`
                    );
                }

                const loadedFromJson = classes.size - BaseClassesMap.size;
                const missingClasses: Array<{ name: string; file: string }> = [];

                for (const [className, fileName] of expectedClassNames) {
                    if (!classes.has(className)) {
                        missingClasses.push({ name: className, file: fileName });
                    }
                }

                const unexpectedClasses: string[] = [];
                for (const [className] of classes) {
                    if (!BaseClassesMap.has(className) && !expectedClassNames.has(className)) {
                        unexpectedClasses.push(className);
                    }
                }

                const report: string[] = [];
                report.push(`\n=== Class Loading Report ===`);
                report.push(`JSON files found: ${jsonFiles.length}`);
                report.push(`Classes extracted from JSON: ${expectedClassNames.size}`);
                report.push(`Base classes: ${BaseClassesMap.size}`);
                report.push(`Total loaded classes: ${classes.size}`);
                report.push(`Loaded from JSON: ${loadedFromJson}`);
                if (filesWithoutName.length > 0) {
                    report.push(`Files without 'name' field: ${filesWithoutName.length} (${filesWithoutName.join(', ')})`);
                }
                if (filesWithParseErrors.length > 0) {
                    report.push(`Files with parse errors: ${filesWithParseErrors.length}`);
                }
                if (unexpectedClasses.length > 0) {
                    report.push(`Unexpected loaded classes (not in JSON): ${unexpectedClasses.join(', ')}`);
                }

                if (missingClasses.length > 0) {
                    const missingList = missingClasses
                        .map(m => `  - ${m.name} (from ${m.file})`)
                        .join('\n');
                    report.push(`\nMissing classes: ${missingList}`);
                    assert.fail(
                        `Failed to load ${missingClasses.length} class(es) from JSON:\n${missingList}\n\n` +
                        report.join('\n')
                    );
                }

                const expectedFromJson = expectedClassNames.size;
                if (loadedFromJson !== expectedFromJson) {
                    const diff = expectedFromJson - loadedFromJson;
                    report.push(`\n⚠️  WARNING: Mismatch detected!`);
                    report.push(`Expected ${expectedFromJson} classes from JSON, but loaded ${loadedFromJson}`);
                    report.push(`Difference: ${diff} class(es)`);
                    
                    const allLoadedNames = new Set(Array.from(classes.keys()).filter(name => !BaseClassesMap.has(name)));
                    const notLoaded = Array.from(expectedClassNames.keys()).filter(name => !allLoadedNames.has(name));
                    
                    if (notLoaded.length > 0) {
                        report.push(`Classes not loaded: ${notLoaded.map(name => `${name} (from ${expectedClassNames.get(name)})`).join(', ')}`);
                        
                        for (const className of notLoaded) {
                            const fileName = expectedClassNames.get(className)!;
                            const filePath = path.join(resourcesDir, fileName);
                            
                            report.push(`\n--- Diagnostic for ${className} (${fileName}) ---`);
                            
                            try {
                                const content = fs.readFileSync(filePath, 'utf8');
                                const json = JSON.parse(content);
                                
                                report.push(`✓ File exists and is valid JSON`);
                                report.push(`  - kind: ${json.kind}`);
                                report.push(`  - name: ${json.name}`);
                                report.push(`  - has extends: ${json.extends ? JSON.stringify(json.extends) : 'none'}`);
                                report.push(`  - has typeParameters: ${json.typeParameters ? JSON.stringify(json.typeParameters) : 'none'}`);
                                
                                const testLoader = new JsonClassLoader();
                                try {
                                    const testClasses = testLoader.loadFromDirectory(resourcesDir, BaseClassesMap);
                                    if (testClasses.has(className)) {
                                        report.push(`  ⚠️  Class loads successfully in isolation, but was missing in main load`);
                                    } else {
                                        report.push(`  ✗ Class does not load even in isolation`);
                                        
                                        const classWarnings = warnings.filter(w => w.includes(className) || w.includes(fileName));
                                        if (classWarnings.length > 0) {
                                            report.push(`  Warnings related to this class:`);
                                            classWarnings.forEach(w => report.push(`    - ${w}`));
                                        }
                                    }
                                } catch (loadError) {
                                    const errorMsg = loadError instanceof Error ? loadError.message : String(loadError);
                                    report.push(`  ✗ Failed to load: ${errorMsg}`);
                                }
                            } catch (fileError) {
                                const errorMsg = fileError instanceof Error ? fileError.message : String(fileError);
                                report.push(`✗ Cannot read/parse file: ${errorMsg}`);
                            }
                        }
                    }
                    
                    console.warn(report.join('\n'));
                }

                if (warnings.length > 0) {
                    assert.fail(
                        `JsonClassLoader produced warnings:\n${warnings.join('\n')}\n\n` +
                        report.join('\n')
                    );
                }

                console.log(
                    `Successfully loaded ${classes.size} classes ` +
                        `(${BaseClassesMap.size} base + ${loadedFromJson} from JSON)`
                );
                
                if (loadedFromJson === expectedFromJson) {
                    console.log(
                        `✓ All ${expectedFromJson} expected classes from ${jsonFiles.length} JSON files were loaded successfully.`
                    );
                } else {
                    console.log(report.join('\n'));
                }
            } finally {
                console.warn = originalWarn;
                console.error = originalError;
            }
        });

        it('should load generic classes correctly (if any)', () => {
            if (!fs.existsSync(resourcesDir)) {
                throw new Error(`Resources directory does not exist: ${resourcesDir}`);
            }

            loader.loadFromDirectory(resourcesDir, BaseClassesMap);
            const genericClasses = loader.getGenericClasses();

            const foundGenericClasses: string[] = [];

            for (const [name, genericClass] of genericClasses) {
                foundGenericClasses.push(name);

                assert.ok(
                    genericClass.typeParameters,
                    `Generic class ${name} should have typeParameters`
                );
                assert.ok(
                    genericClass.typeParameters!.length > 0,
                    `Generic class ${name} should have at least one type parameter`
                );
                assert.ok(
                    typeof genericClass.instantiate === 'function',
                    `Generic class ${name} should have instantiate function`
                );
            }

            if (genericClasses.size > 0) {
                console.log(
                    `Found ${genericClasses.size} generic classes: ${foundGenericClasses.join(
                        ', '
                    )}`
                );
            } else {
                console.log('No generic classes found (this may be expected for now).');
            }
        });

        it('should instantiate generic classes correctly (if any)', () => {
            if (!fs.existsSync(resourcesDir)) {
                throw new Error(`Resources directory does not exist: ${resourcesDir}`);
            }

            loader.loadFromDirectory(resourcesDir, BaseClassesMap);
            const genericClasses = loader.getGenericClasses();

            if (genericClasses.size === 0) {
                console.log('No generic classes to test instantiation');
                return;
            }

            let instantiatedCount = 0;

            for (const [name, genericClass] of genericClasses) {
                if (!genericClass.typeParameters || genericClass.typeParameters.length === 0) {
                    continue;
                }

                const typeArgs = genericClass.typeParameters.map(param => ({
                    name: 'int',
                    typeArguments: [] as any[]
                }));

                const instance = genericClass.instantiate(typeArgs);

                assert.ok(instance, `Should instantiate ${name} with type arguments`);
                assert.ok(
                    instance.name.includes('<'),
                    `Instantiated class name should contain type arguments: ${instance.name}`
                );
                assert.strictEqual(
                    instance.kind,
                    genericClass.kind,
                    `Instantiated class should have same kind as generic definition`
                );

                instantiatedCount++;
                console.log(`Successfully instantiated generic ${name} as ${instance.name}`);
            }

            assert.ok(
                instantiatedCount > 0,
                'At least one generic class should be instantiated'
            );
        });
    });
});
