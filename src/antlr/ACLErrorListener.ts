import { BaseErrorListener, Recognizer, RecognitionException, Token, ATNSimulator } from 'antlr4ng';

export interface ANTLRError {
    line: number;
    charPositionInLine: number;
    msg: string;
    offendingSymbol?: string;
}

export class ACLErrorListener extends BaseErrorListener {
    public errors: ANTLRError[] = [];

    public syntaxError<S extends Token, T extends ATNSimulator>(
        recognizer: Recognizer<T>,
        offendingSymbol: S | null,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | null
    ): void {
        const symbol = offendingSymbol?.text || '';
        this.errors.push({
            line,
            charPositionInLine,
            msg,
            offendingSymbol: symbol,
        });
    }

    public flush(): this {
        this.errors = [];
        return this;
    }
}
