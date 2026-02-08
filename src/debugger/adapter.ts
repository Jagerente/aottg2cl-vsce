import * as vscode from 'vscode';
import * as Net from 'net';
import { DebugSession, InitializedEvent, TerminatedEvent, StoppedEvent, BreakpointEvent, OutputEvent, Thread, StackFrame, Scope, Source, Breakpoint } from 'vscode-debugadapter';
import { DebugProtocol } from 'vscode-debugprotocol';
import { Settings } from '../config/settings';

interface LaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
    program: string;
    stopOnEntry?: boolean;
    port?: number;
    trace?: boolean;
}

export class CLDebugSession extends DebugSession {
    private socket: Net.Socket | null = null;
    private messageBuffer: string = '';
    private pendingRequests: Map<number, (response: any) => void> = new Map();
    private requestSeq: number = 1;
    private connected: boolean = false;

    public constructor() {
        super();
        this.setDebuggerLinesStartAt1(false);
        this.setDebuggerColumnsStartAt1(false);
    }

    protected initializeRequest(response: DebugProtocol.InitializeResponse, args: DebugProtocol.InitializeRequestArguments): void {
        // Build and return capabilities
        response.body = response.body || {};
        response.body.supportsConfigurationDoneRequest = true;

        this.sendResponse(response);

        // Send initialized event after capabilities are negotiated
        this.sendEvent(new InitializedEvent());
    }

    protected async launchRequest(response: DebugProtocol.LaunchResponse, args: LaunchRequestArguments): Promise<void> {
        const port = args.port ?? 4711;

        try {
            await this.connectToServer('localhost', port);

            // Send launch request to C# server
            const launchArgs = {
                program: this.normalizePath(args.program),
                stopOnEntry: args.stopOnEntry || false
            };

            await this.sendDAPRequest('launch', launchArgs);
            this.sendResponse(response);
        } catch (error) {
            let errorMessage = error instanceof Error ? error.message : String(error);
            if (errorMessage === '') {
                errorMessage = 'Unknown error';
            }
            response.success = false;
            response.message = `Failed to connect to debugger server on port ${port}: ${errorMessage}`;
            this.sendResponse(response);
            this.sendEvent(new TerminatedEvent());
        }
    }

    protected async setBreakPointsRequest(response: DebugProtocol.SetBreakpointsResponse, args: DebugProtocol.SetBreakpointsArguments): Promise<void> {
        const path = args.source.path;
        if (!path) {
            response.success = false;
            response.message = 'Missing source.path for setBreakPointsRequest';
            this.sendResponse(response);
            return;
        }
    
        const clientLines = args.breakpoints || [];

        const breakpointArgs = {
            source: { path: this.normalizePath(path) },
            breakpoints: clientLines.map(bp => ({ line: bp.line }))
        };

        try {
            const serverResponse = await this.sendDAPRequest('setBreakpoints', breakpointArgs);

            const breakpoints = serverResponse.breakpoints.map((bp: any) => {
                const breakpoint: any = new Breakpoint(bp.verified, bp.line);
                if (!bp.verified && bp.message) {
                    breakpoint.message = bp.message;
                }
                return breakpoint;
            });

            response.body = { breakpoints };
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected configurationDoneRequest(response: DebugProtocol.ConfigurationDoneResponse, args: DebugProtocol.ConfigurationDoneArguments): void {
        this.sendDAPRequest('configurationDone', {}).catch(() => {});
        this.sendResponse(response);
    }

    protected async threadsRequest(response: DebugProtocol.ThreadsResponse): Promise<void> {
        try {
            const serverResponse = await this.sendDAPRequest('threads', {});
            response.body = {
                threads: serverResponse.threads.map((t: any) => new Thread(t.id, t.name))
            };
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected async stackTraceRequest(response: DebugProtocol.StackTraceResponse, args: DebugProtocol.StackTraceArguments): Promise<void> {
        try {
            const serverResponse = await this.sendDAPRequest('stackTrace', { threadId: args.threadId });

            const stackFrames = serverResponse.stackFrames.map((frame: any) => {
                const source = new Source(frame.source.name, this.convertDebuggerPathToClient(frame.source.path));
                return new StackFrame(
                    frame.id,
                    frame.name,
                    source,
                    frame.line,
                    frame.column
                );
            });

            response.body = {
                stackFrames,
                totalFrames: serverResponse.totalFrames || stackFrames.length
            };
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected async scopesRequest(response: DebugProtocol.ScopesResponse, args: DebugProtocol.ScopesArguments): Promise<void> {
        try {
            const serverResponse = await this.sendDAPRequest('scopes', { frameId: args.frameId });

            const scopes = serverResponse.scopes.map((scope: any) => {
                return new Scope(scope.name, scope.variablesReference, scope.expensive);
            });

            response.body = { scopes };
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected async variablesRequest(response: DebugProtocol.VariablesResponse, args: DebugProtocol.VariablesArguments): Promise<void> {
        try {
            const serverResponse = await this.sendDAPRequest('variables', { variablesReference: args.variablesReference });

            response.body = {
                variables: serverResponse.variables
            };
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected async continueRequest(response: DebugProtocol.ContinueResponse, args: DebugProtocol.ContinueArguments): Promise<void> {
        try {
            await this.sendDAPRequest('continue', { threadId: args.threadId });
            response.body = { allThreadsContinued: true };
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected async nextRequest(response: DebugProtocol.NextResponse, args: DebugProtocol.NextArguments): Promise<void> {
        try {
            await this.sendDAPRequest('next', { threadId: args.threadId });
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected async stepInRequest(response: DebugProtocol.StepInResponse, args: DebugProtocol.StepInArguments): Promise<void> {
        try {
            await this.sendDAPRequest('stepIn', { threadId: args.threadId });
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected async stepOutRequest(response: DebugProtocol.StepOutResponse, args: DebugProtocol.StepOutArguments): Promise<void> {
        try {
            await this.sendDAPRequest('stepOut', { threadId: args.threadId });
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected async pauseRequest(response: DebugProtocol.PauseResponse, args: DebugProtocol.PauseArguments): Promise<void> {
        try {
            await this.sendDAPRequest('pause', { threadId: args.threadId });
            this.sendResponse(response);
        } catch (error) {
            response.success = false;
            response.message = error instanceof Error ? error.message : String(error);
            this.sendResponse(response);
        }
    }

    protected disconnectRequest(response: DebugProtocol.DisconnectResponse, args: DebugProtocol.DisconnectArguments): void {
        if (this.connected) {
            this.sendDAPRequest('disconnect', {}).catch(() => {});
        }

        if (this.socket) {
            this.socket.destroy();
        }

        this.connected = false;
        this.sendResponse(response);
        this.sendEvent(new TerminatedEvent());
    }

    private connectToServer(host: string, port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socket = new Net.Socket();

            this.socket.on('connect', () => {
                this.connected = true;
                resolve();
            });

            this.socket.on('data', (data: Buffer) => {
                this.handleServerData(data);
            });

            this.socket.on('error', (error: Error) => {
                if (!this.connected) {
                    reject(error);
                    return;
                }
            
                this.sendEvent(new OutputEvent(`Debug adapter socket error: ${error.message}\n`, 'stderr'));
            });

            this.socket.on('close', () => {
                const wasConnected = this.connected;
                this.connected = false;
                this.socket = null;

                if (wasConnected) {
                    this.sendEvent(new TerminatedEvent());
                }
            });

            this.socket.connect(port, host);
        });
    }

    private handleServerData(data: Buffer): void {
        this.messageBuffer += data.toString('utf8');

        while (true) {
            // Look for Content-Length header
            const headerMatch = this.messageBuffer.match(/Content-Length: (\d+)\r\n\r\n/);
            if (!headerMatch) {
                break;
            }

            const contentLength = parseInt(headerMatch[1], 10);
            const messageStart = headerMatch[0].length;
            const messageEnd = messageStart + contentLength;

            if (this.messageBuffer.length < messageEnd) {
                // Not enough data yet
                break;
            }

            const messageText = this.messageBuffer.substring(messageStart, messageEnd);
            this.messageBuffer = this.messageBuffer.substring(messageEnd);

            try {
                const message = JSON.parse(messageText);
                this.handleServerMessage(message);
            } catch (error) {
                this.sendEvent(new OutputEvent(`Error parsing message: ${error}\n`, 'stderr'));
            }
        }
    }

    private handleServerMessage(message: any): void {
        if (message.type === 'response') {
            // Handle response to our request
            const callback = this.pendingRequests.get(message.request_seq);
            if (callback) {
                this.pendingRequests.delete(message.request_seq);
                callback(message);
            }
        } else if (message.type === 'event') {
            // Handle event from server
            this.handleServerEvent(message);
        }
    }

    private handleServerEvent(event: any): void {
        switch (event.event) {
            case 'stopped':
                this.sendEvent(new StoppedEvent(event.body.reason, event.body.threadId, event.body.text));
                break;
            case 'continued':
                // VSCode doesn't have a specific continued event in the same way
                break;
            case 'output':
                this.sendEvent(new OutputEvent(event.body.output, event.body.category));
                break;
            case 'terminated':
                this.sendEvent(new TerminatedEvent());
                break;
            case 'breakpoint':
                const bp: any = new Breakpoint(event.body.breakpoint.verified, event.body.breakpoint.line);
                if (event.body.breakpoint.id !== undefined) {
                    bp.id = event.body.breakpoint.id;
                }
                this.sendEvent(new BreakpointEvent(event.body.reason, bp));
                break;
        }
    }

    private sendDAPRequest(command: string, args: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.socket || !this.connected) {
                reject(new Error('Not connected to debugger server'));
                return;
            }

            const seq = this.requestSeq++;
            const request = {
                seq,
                type: 'request',
                command,
                arguments: args
            };

            const requestJson = JSON.stringify(request);
            const header = `Content-Length: ${Buffer.byteLength(requestJson, 'utf8')}\r\n\r\n`;
            const message = header + requestJson;

            this.pendingRequests.set(seq, (response: any) => {
                if (response.success) {
                    resolve(response.body || {});
                } else {
                    reject(new Error(response.message || 'Request failed'));
                }
            });

            this.socket.write(message, 'utf8');
        });
    }

    private normalizePath(path: string): string {
        // Convert backslashes to forward slashes for consistency
        return path.replace(/\\/g, '/');
    }
}

export class DebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
    createDebugAdapterDescriptor(
        _session: vscode.DebugSession
    ): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
        return new vscode.DebugAdapterInlineImplementation(new CLDebugSession());
    }
}

export class DebugConfigurationProvider implements vscode.DebugConfigurationProvider {
    resolveDebugConfiguration(
        folder: vscode.WorkspaceFolder | undefined,
        config: vscode.DebugConfiguration
    ): vscode.ProviderResult<vscode.DebugConfiguration> {
        const editor = vscode.window.activeTextEditor;

        if (!config.type && !config.request && !config.name) {
            if (editor && editor.document.languageId === 'acl') {
                const port = typeof Settings.debugPort === 'number' ? Settings.debugPort : 4711;

                return {
                    type: 'cl',
                    request: 'launch',
                    name: 'Debug CL Script',
                    program: editor.document.fileName,
                    stopOnEntry: false,
                    port,
                };
            }

            return undefined;
        }

        if (!config.program && editor && editor.document.languageId === 'acl') {
            config.program = editor.document.fileName;
        }

        if (typeof config.port !== 'number' || Number.isNaN(config.port)) {
            config.port = typeof Settings.debugPort === 'number' ? Settings.debugPort : 4711;
        }

        config.type = config.type ?? 'cl';
        config.request = config.request ?? 'launch';
        config.name = config.name ?? 'Debug CL Script';

        return config;
    }
}
