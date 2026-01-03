import * as fs from 'fs';
import * as path from 'path';

interface ClassJson {
    name: string;
    kind?: string;
}

function readClassNames(classesDir: string): string[] {
    const classNames: string[] = [];
    
    if (!fs.existsSync(classesDir)) {
        console.error(`Classes directory not found: ${classesDir}`);
        process.exit(1);
    }
    
    const files = fs.readdirSync(classesDir);
    
    for (const file of files) {
        if (!file.endsWith('.json')) {
            continue;
        }
        
        const filePath = path.join(classesDir, file);
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const classData: ClassJson = JSON.parse(content);
            
            if (classData.name) {
                classNames.push(classData.name);
            }
        } catch (error) {
            console.warn(`Failed to parse ${file}:`, error);
        }
    }
    
    return classNames.sort();
}

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateSyntaxFile(syntaxFilePath: string, classNames: string[]): void {
    if (!fs.existsSync(syntaxFilePath)) {
        console.error(`Syntax file not found: ${syntaxFilePath}`);
        process.exit(1);
    }
    
    const content = fs.readFileSync(syntaxFilePath, 'utf-8');
    const syntaxData = JSON.parse(content);
    
    // Create the regex pattern for classes: (?:Class1|Class2|Class3|...)
    const classPattern = classNames.map(escapeRegex).join('|');
    const classRegex = `(?:${classPattern})`;
    
    // Update pattern 1: @param with classes
    // Pattern: \s*(@param)\s+([A-Za-z_][A-Za-z0-9_]*)\s+((?:Game|Network|...)(?:\s*<[^<>]*>)?)\s*(?:\s+(.*?))?(?=\s*\*/|$)
    const paramPattern = `\\s*(@param)\\s+([A-Za-z_][A-Za-z0-9_]*)\\s+(${classRegex}(?:\\s*<[^<>]*>)?)\\s*(?:\\s+(.*?))?(?=\\s*\\*/|$)`;
    
    // Update pattern 2: @type|@return|@var with classes
    // Pattern: \s*(@type|@return|@var)\s+((?:Game|Network|...)(?:\s*<[^<>]*>)?)\s*(?:\s+(.*?))?(?=\s*\*/|$)
    const typePattern = `\\s*(@type|@return|@var)\\s+(${classRegex}(?:\\s*<[^<>]*>)?)\\s*(?:\\s+(.*?))?(?=\\s*\\*/|$)`;
    
    // Update pattern 3: support.type.acl
    // Pattern: \b(Game|Network|...)\b
    const supportTypePattern = `\\b(${classPattern})\\b`;
    
    // Find and update the patterns in the repository
    if (syntaxData.repository?.annotations?.patterns) {
        for (const pattern of syntaxData.repository.annotations.patterns) {
            // Update @param pattern with classes (the one that has (?:Game|Network|...))
            if (pattern.match && 
                pattern.match.includes('@param') && 
                pattern.match.includes('(?:') && 
                pattern.match.includes('Game|Network')) {
                pattern.match = paramPattern;
                console.log('Updated @param pattern with classes');
            }
            // Update @type|@return|@var pattern with classes
            if (pattern.match && 
                pattern.match.includes('@type|@return|@var') && 
                pattern.match.includes('(?:') && 
                pattern.match.includes('Game|Network')) {
                pattern.match = typePattern;
                console.log('Updated @type|@return|@var pattern with classes');
            }
        }
    }
    
    if (syntaxData.repository?.['storage-types']?.patterns) {
        for (const pattern of syntaxData.repository['storage-types'].patterns) {
            if (pattern.name === 'support.type.acl' && pattern.match) {
                pattern.match = supportTypePattern;
                console.log('Updated support.type.acl pattern');
            }
        }
    }
    
    const updatedContent = JSON.stringify(syntaxData, null, 2);
    fs.writeFileSync(syntaxFilePath, updatedContent, 'utf-8');
    
    console.log(`Updated syntax file with ${classNames.length} classes`);
}

function main(): void {
    const projectRoot = path.resolve(__dirname, '..');
    const classesDir = path.join(projectRoot, 'resources', 'classes');
    const syntaxFilePath = path.join(projectRoot, 'syntaxes', 'acl.tmLanguage.json');
    
    console.log('Reading class names from:', classesDir);
    const classNames = readClassNames(classesDir);
    
    console.log(`Found ${classNames.length} classes:`, classNames.join(', '));
    
    console.log('Updating syntax file:', syntaxFilePath);
    updateSyntaxFile(syntaxFilePath, classNames);
    
    console.log('Done!');
}

main();
