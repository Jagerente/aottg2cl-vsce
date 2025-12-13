import * as vscode from 'vscode';
import {ACLManager} from '../antlr4ts/ACLManager';
import {ANTLRValidator} from './ANTLRValidator';
import {ClassUsageValidator} from './ClassUsageValidator';
import {IncompleteMemberAccessValidator} from './IncompleteMemberAccessValidator';
import {CutsceneValidator} from './CutsceneValidator';
import {DocumentTreeProvider} from '../utils/DocumentTreeProvider';
import {CtorValidator} from './CtorValidator';
import {DuplicatesValidator} from './DuplicatesValidator';

export class DiagnosticManager {
    private diagnosticCollection: vscode.DiagnosticCollection;
    private validators: IValidator[] = [];

    constructor(
        diagnosticCollection: vscode.DiagnosticCollection,
        aclManager: ACLManager,
        documentTreeProvider: DocumentTreeProvider,
    ) {
        this.diagnosticCollection = diagnosticCollection;
        this.validators = this.validators.concat(new ANTLRValidator(aclManager));
        this.validators = this.validators.concat(new ClassUsageValidator(documentTreeProvider));
        this.validators = this.validators.concat(new DuplicatesValidator(documentTreeProvider));
        this.validators = this.validators.concat(new IncompleteMemberAccessValidator());
        this.validators = this.validators.concat(new CutsceneValidator(documentTreeProvider));
        this.validators = this.validators.concat(new CtorValidator(documentTreeProvider));
    }

    public validateDocument(document: vscode.TextDocument) {
        if (document.languageId !== 'acl') {
            return;
        }

        let diagnostics: vscode.Diagnostic[] = [];

        this.validators.forEach(validator => {
            diagnostics = diagnostics.concat(validator.validate(document));
        });

        const documentLineCount = document.lineCount;
        const filteredDiagnostics = diagnostics.filter(diagnostic => {
            if (diagnostic.range.start.line < 0 || diagnostic.range.start.line >= documentLineCount) {
                return false;
            }
            if (diagnostic.range.end.line < 0 || diagnostic.range.end.line >= documentLineCount) {
                return false;
            }
            try {
                const startLine = document.lineAt(diagnostic.range.start.line);
                const endLine = document.lineAt(diagnostic.range.end.line);
                if (diagnostic.range.start.character < 0 || diagnostic.range.start.character > startLine.text.length) {
                    return false;
                }
                if (diagnostic.range.end.character < 0 || diagnostic.range.end.character > endLine.text.length) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            return true;
        });

        this.diagnosticCollection.set(document.uri, filteredDiagnostics);
    }
}

export interface IValidator {
    validate(document: vscode.TextDocument): vscode.Diagnostic[];
}
