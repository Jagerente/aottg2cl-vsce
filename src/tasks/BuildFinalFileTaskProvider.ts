import * as vscode from 'vscode';

export class BuildFinalFileTaskProvider implements vscode.TaskProvider {
    static type = 'acl';

    provideTasks(): vscode.Task[] {
        const def: vscode.TaskDefinition = {type: BuildFinalFileTaskProvider.type, task: 'build'};
        const execution = new vscode.CustomExecution(async (): Promise<vscode.Pseudoterminal> => {
            return new BuildPseudoterminal();
        });

        const task = new vscode.Task(
            def,
            vscode.TaskScope.Workspace,
            'Build ACL Script',
            BuildFinalFileTaskProvider.type,
            execution
        );
        task.group = vscode.TaskGroup.Build;
        return [task];
    }

    resolveTask(task: vscode.Task): vscode.Task | undefined {
        return task;
    }
}

class BuildPseudoterminal implements vscode.Pseudoterminal {
    private writeEmitter = new vscode.EventEmitter<string>();
    onDidWrite = this.writeEmitter.event;

    open(_initialDimensions: vscode.TerminalDimensions | undefined): void {
        vscode.commands.executeCommand('extension.buildScript')
            .then(
                () => {
                    this.writeEmitter.fire('Build command executed.\r\n');
                    this.close();
                },
                err => {
                    this.writeEmitter.fire(`Build command failed: ${err?.message || err}\r\n`);
                    this.close();
                }
            );
    }

    close(): void {
    }
}
