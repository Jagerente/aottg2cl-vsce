import * as vscode from 'vscode';
import { KeywordCompletionProvider } from './completions/KeywordCompletionProvider';
import { VariableCompletionProvider } from './completions/VariableCompletionProvider';
import { GameClass } from './classes/GameClass';
import { NetworkClass } from './classes/NetworkClass';
import { UIClass } from './classes/UIClass';
import { TimeClass } from './classes/TimeClass';
import { ConvertClass } from './classes/ConvertClass';
import { StringClass } from './classes/StringClass';
import { InputClass } from './classes/InputClass';
import { MathClass } from './classes/MathClass';
import { RandomClass } from './classes/RandomClass';
import { CutsceneClass } from './classes/CutsceneClass';
import { CameraClass } from './classes/CameraClass';
import { RoomDataClass } from './classes/RoomDataClass';
import { PersistentDataClass } from './classes/PersistentDataClass';
import { JsonClass } from './classes/JsonClass';
import { PhysicsClass } from './classes/PhysicsClass';
import { MainFunctionsCompletionProvider } from './completions/MainFunctionsCompletionProvider';
import { MapClass } from "./classes/MapClass";
import { MissingSemicolonValidator } from './diagnostic/MissingSemicolonValidator';
import { BracketValidator } from './diagnostic/BracketValidator';
import { ClassUsageValidator } from './diagnostic/ClassUsageValidator';
import { CustomClassValidator } from './diagnostic/CustomClassValidator';
import { VariableDefinitionProvider } from './definition/VariableDefinitionProvider';
import { PlayerClass } from './classes/PlayerClass';
import { IncompleteMemberAccessValidator } from './diagnostic/IncompleteMemberAccessValidator';
import { ComponentClass } from './classes/ComponentClass';
import { ObjectClass } from './classes/ObjectClass';
import { CharacterClass } from './classes/CharacterClass';
import { HumanClass } from './classes/HumanClass';
import { TitanClass } from './classes/TitanClass';
import { ShifterClass } from './classes/ShifterClass';
import { MapObjectClass } from './classes/MapObjectClass';
import { TransformClass } from './classes/TransformClass';
import { NetworkViewClass } from './classes/NetworkViewClass';
import { ColorClass } from './classes/ColorClass';
import { Vector3Class } from './classes/Vector3Class';
import { QuaternionClass } from './classes/QuaternionClass';
import { DictClass } from './classes/DictClass';
import { ListClass } from './classes/ListClass';
import { LineCastHitResultClass } from './classes/LineCastHitResultClass';
import { IClass } from './classes/IClass';

export function activate(context: vscode.ExtensionContext) {

	const availableClasses = [
		new GameClass(),
		new NetworkClass(),
		new MapClass(),
		new UIClass(),
		new TimeClass(),
		new ConvertClass(),
		new StringClass(),
		new InputClass(),
		new MathClass(),
		new RandomClass(),
		new CutsceneClass(),
		new CameraClass(),
		new RoomDataClass(),
		new PersistentDataClass(),
		new JsonClass(),
		new PhysicsClass(),
		new ComponentClass(),
		new ObjectClass(),
		new CharacterClass(),
		new HumanClass(),
		new TitanClass(),
		new ShifterClass(),
		new MapObjectClass(),
		new TransformClass(),
		new PlayerClass(),
		new NetworkViewClass(),
		new ColorClass(),
		new Vector3Class(),
		new QuaternionClass(),
		new DictClass(),
		new ListClass(),
		new LineCastHitResultClass(),
	];

	const availableClassesMap = createClassMap(availableClasses);

	const keywordsProvider = new KeywordCompletionProvider();
	const variablesProvider = new VariableCompletionProvider(availableClassesMap);
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, variablesProvider, ' ', '.'),
		vscode.languages.registerHoverProvider({ language: 'acl' }, variablesProvider),
		vscode.languages.registerSignatureHelpProvider({ language: 'acl' }, variablesProvider, '(', ',', ' '),
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, keywordsProvider, ' '),
		vscode.languages.registerCompletionItemProvider({ language: 'acl' }, new MainFunctionsCompletionProvider(), ' '),
		vscode.languages.registerHoverProvider({ language: 'acl' }, keywordsProvider)
	);

	const diagnosticCollection = vscode.languages.createDiagnosticCollection('acl');
	context.subscriptions.push(diagnosticCollection);

	vscode.workspace.onDidOpenTextDocument(doc => validateDocument(doc, diagnosticCollection, availableClasses));
	vscode.workspace.onDidChangeTextDocument(event => validateDocument(event.document, diagnosticCollection, availableClasses));

	vscode.languages.registerDefinitionProvider({ language: 'acl' }, new VariableDefinitionProvider());

	function validateDocument(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection, availableClasses: any[]) {
		if (document.languageId !== 'acl') return;

		let diagnostics: vscode.Diagnostic[] = [];

		diagnostics = diagnostics.concat(MissingSemicolonValidator.validate(document));
		diagnostics = diagnostics.concat(BracketValidator.validate(document));
		diagnostics = diagnostics.concat(new ClassUsageValidator(availableClasses).validate(document));
		diagnostics = diagnostics.concat(new CustomClassValidator().validate(document));
		diagnostics = diagnostics.concat(IncompleteMemberAccessValidator.validate(document));

		diagnosticCollection.set(document.uri, diagnostics);
	}

	function createClassMap(classes: IClass[]): Map<string, IClass> {
		const classMap = new Map<string, IClass>();

		classes.forEach(classItem => {
			classMap.set(classItem.name, classItem);
		});

		return classMap;
	}
}

export function deactivate() { }
