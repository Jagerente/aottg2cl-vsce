import * as vscode from 'vscode';
import {IClass} from '../classes/IClass';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {IValidator} from './DiagnosticManager';

export interface IUserDefinedClassValidator {
    validateClass(classDef: IClass, document: vscode.TextDocument): vscode.Diagnostic[];
}

export class UserDefinedClassesValidator implements IValidator {
    private documentTreeProvider: DocumentTreeProvider;
    private validators: IUserDefinedClassValidator[] = [];

    constructor(documentTreeProvider: DocumentTreeProvider) {
        this.documentTreeProvider = documentTreeProvider;
    }

    public registerValidator(validator: IUserDefinedClassValidator): void {
        this.validators.push(validator);
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        const diagnostics: vscode.Diagnostic[] = [];
        const userDefinedClasses = this.documentTreeProvider.getUserDefinedClasses(document);

        userDefinedClasses.forEach((classDef: IClass) => {
            this.validators.forEach(validator => {
                const validatorDiagnostics = validator.validateClass(classDef, document);
                diagnostics.push(...validatorDiagnostics);
            });
        });

        return diagnostics;
    }
}

