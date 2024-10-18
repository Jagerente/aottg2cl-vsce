import { ANTLRErrorListener, Recognizer, Token, RecognitionException } from 'antlr4ts';
import { IError } from '../classes/IClass';

export class LexerErrorListener implements ANTLRErrorListener<number> {
    public errors: IError[] = [];

    public syntaxError(
        recognizer: Recognizer<number, any>,
        offendingSymbol: number | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined
    ): void {
        const symbol = offendingSymbol !== undefined ? offendingSymbol.toString() : '';
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

export class ParserErrorListener implements ANTLRErrorListener<Token> {
    public errors: IError[] = [];

    public syntaxError(
        recognizer: Recognizer<Token, any>,
        offendingSymbol: Token | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined
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

