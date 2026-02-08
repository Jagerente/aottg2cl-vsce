import {workspace, WorkspaceConfiguration} from 'vscode';

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

    public static get rememberLastPath(): boolean {
        return Settings.config.get<boolean>('build.rememberLastPath', false);
    }

    public static get rememberLastName(): boolean {
        return Settings.config.get<boolean>('build.rememberLastName', false);
    }

    public static get disableAutoParameters(): boolean {
        return Settings.config.get<boolean>('completion.disableAutoParameters', false);
    }

    public static get debugPort(): number {
        return Settings.config.get<number>('debug.port', 4711);
    }

    public static get parsingDebounceDelay(): number {
        const delay = Settings.config.get<number>('parsing.debounceDelay', 300);
        return Math.max(50, Math.min(1000, delay));
    }
}
