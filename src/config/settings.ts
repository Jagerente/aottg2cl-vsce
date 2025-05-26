import {workspace, WorkspaceConfiguration} from 'vscode';

export class Settings {
    private static readonly section = 'aottg2cl';

    private static get config(): WorkspaceConfiguration {
        return workspace.getConfiguration(Settings.section);
    }

    public static get showClassUsageDiagnostics(): boolean {
        return Settings.config.get<boolean>('showClassUsageDiagnostics', true);
    }

    public static get showUnresolvedMemberWarnings(): boolean {
        return Settings.config.get<boolean>('showUnresolvedMemberWarnings', false);
    }
}
