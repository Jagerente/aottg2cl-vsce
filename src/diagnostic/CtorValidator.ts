import * as vscode from 'vscode';
import {ClassKinds, IClass} from '../classes/IClass';
import {IUserDefinedClassValidator} from './UserDefinedClassesValidator';
import {DiagnosticCodes} from './DiagnosticCodes';

export class CtorValidator implements IUserDefinedClassValidator {
    public validateClass(classDef: IClass, document: vscode.TextDocument): vscode.Diagnostic[] {
        if (classDef.kind === ClassKinds.EXTENSION) {
            return [];
        }

        const constructors = classDef.constructors;
        if (!constructors || constructors.length <= 1) {
            return [];
        }

        return constructors
            .filter(ctor => ctor.declarationRange !== undefined)
            .map(ctor => {
                const diagnostic = new vscode.Diagnostic(
                    ctor.declarationRange!,
                    `Class '${classDef.name}' has multiple constructors, which is not allowed.`,
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostic.code = DiagnosticCodes.MULTIPLE_CONSTRUCTORS;
                return diagnostic;
            });
    }
}
