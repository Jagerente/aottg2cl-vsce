import * as vscode from 'vscode';

export class BuildFinalFileIntoMapTaskProvider implements vscode.TaskProvider {
    static type = 'acl';

    provideTasks(): vscode.Task[] {
        const def: vscode.TaskDefinition = {type: BuildFinalFileIntoMapTaskProvider.type, task: 'build-into-map'};
        const execution = new vscode.CustomExecution(async (): Promise<vscode.Pseudoterminal> => {
            return new BuildIntoMapPseudoterminal();
        });

        const task = new vscode.Task(
            def,
            vscode.TaskScope.Workspace,
            'Build Custom Logic Into Custom Map',
            BuildFinalFileIntoMapTaskProvider.type,
            execution
        );
        task.group = vscode.TaskGroup.Build;
        return [task];
    }

    resolveTask(task: vscode.Task): vscode.Task | undefined {
        return task;
    }
}

class BuildIntoMapPseudoterminal implements vscode.Pseudoterminal {
    private writeEmitter = new vscode.EventEmitter<string>();
    onDidWrite = this.writeEmitter.event;
    
    private closeEmitter = new vscode.EventEmitter<number | void>();
    onDidClose = this.closeEmitter.event;

    open(_initialDimensions: vscode.TerminalDimensions | undefined): void {
        vscode.commands.executeCommand('extension.buildScriptIntoMap')
            .then(
                () => {
                    this.writeEmitter.fire('Build into map command executed.\r\n');
                    this.close();
                },
                err => {
                    this.writeEmitter.fire(`Build into map command failed: ${err?.message || err}\r\n`);
                    this.close();
                }
            );
    }

    close(): void {
        this.closeEmitter.fire();
    }
} 
