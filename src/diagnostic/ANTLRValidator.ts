import * as vscode from 'vscode';
import {ACLManager} from "../antlr4ts/ACLManager";
import {IValidator} from "./DiagnosticManager";


export class ANTLRValidator implements IValidator {
    antlrManager: ACLManager;

    constructor(antlrManager: ACLManager) {
        this.antlrManager = antlrManager;
    }

    public validate(document: vscode.TextDocument): vscode.Diagnostic[] {
        return this.antlrManager.getDiagnostics();
    }
}