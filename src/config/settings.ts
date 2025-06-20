import { workspace, WorkspaceConfiguration } from 'vscode';

export class Settings {
    private static readonly section = 'aottg2cl';

    private static get config(): WorkspaceConfiguration {
        return workspace.getConfiguration(Settings.section);
    }

    public static get showClassUsageDiagnostics(): boolean {
        return Settings.config.get<boolean>('diagnostics.showClassUsage', true);
    }

    public static get showUnresolvedMemberWarnings(): boolean {
        return Settings.config.get<boolean>('diagnostics.showUnresolvedMembers', false);
    }

    public static get enableFormatter(): boolean {
        return Settings.config.get<boolean>('format.enableFormatter', true);
    }

    public static get insertSpaces(): boolean {
        return Settings.config.get<boolean>('format.insertSpaces', false);
    }

    public static get tabSize(): number {
        return Settings.config.get<number>('format.tabSize', 4);
    }
}
