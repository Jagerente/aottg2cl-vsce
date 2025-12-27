import * as vscode from 'vscode';
import {ClassKinds, MethodKinds, IClass} from '../classes/IClass';
import {IUserDefinedClassValidator} from './UserDefinedClassesValidator';
import {DiagnosticCodes} from './DiagnosticCodes';

export class CutsceneValidator implements IUserDefinedClassValidator {
    public validateClass(classDef: IClass, document: vscode.TextDocument): vscode.Diagnostic[] {
        if (classDef.kind !== ClassKinds.CUTSCENE) {
            return [];
        }

        if (this.hasValidStartMethod(classDef)) {
            return [];
        }

        if (!classDef.declarationRange) {
            return [];
        }

        const diagnostic = new vscode.Diagnostic(
            classDef.declarationRange,
            `Cutscene '${classDef.name}' must contain a coroutine 'Start()'.`,
            vscode.DiagnosticSeverity.Warning
        );
        diagnostic.code = DiagnosticCodes.CUTSCENE_MISSING_START;
        return [diagnostic];
    }

    private hasValidStartMethod(classDef: IClass): boolean {
        return classDef.instanceMethods.some(
            method =>
                method.label === 'Start' &&
                method.kind === MethodKinds.COROUTINE &&
                method.parameters.length === 0
        );
    }
}
