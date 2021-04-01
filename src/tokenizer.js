'use strict';

class Tokenizer {
    constructor(text) {
        this.text = text;
        this.position = -1;
        this.currentCharacter = null;
        this.advance();
    }

    advance() {
        this.position++;
        this.currentCharacter = this.position < this.text.length ? this.text[this.position] : null;
    }

    makeNumbers() {
        let numStr = '';
        let dotCount = 0;

        while (this.currentCharacter !== null && (TokenTypes.DIGITS + '.').includes(this.currentCharacter)) {
            if (this.currentCharacter === '.') {
                if (dotCount === 1) break;

                dotCount++;
                numStr += '.';
            } else {
                numStr += this.currentCharacter;
            }

            this.advance();
        }

        return numStr;
    }

    makeTokens() {
        const tokens = [];

        while (this.currentCharacter !== null) {
            if (' \t'.includes(this.currentCharacter)) {
                this.advance();
            } else if (TokenTypes.DIGITS.includes(this.currentCharacter) || this.currentCharacter === '.') {
                tokens.push(this.makeNumbers());
            } else if (this.currentCharacter === '+') {
                tokens.push(TokenTypes.PLUS);
                this.advance();
            } else if (this.currentCharacter === '-') {
                tokens.push(TokenTypes.MINUS);
                this.advance();
            } else if (this.currentCharacter === '*') {
                tokens.push(TokenTypes.MULT);
                this.advance();
            } else if (this.currentCharacter === '/') {
                tokens.push(TokenTypes.DIV);
                this.advance();
            } else if (this.currentCharacter === '(') {
                tokens.push(TokenTypes.LPAREN);
                this.advance();
            } else if (this.currentCharacter === ')') {
                tokens.push(TokenTypes.RPAREN);
                this.advance();
            } else if (this.currentCharacter === '^') {
                tokens.push(TokenTypes.POW);
                this.advance();
            } else {
                throw new Error(`Illegal Character at 0:${this.position}`);
            }
        }

        return tokens;
    }
}

const TokenTypes = {
    DIGITS: '0123456789',
    NUMBER: 'NUMBER',
    PLUS: '+',
    MINUS: '-',
    MULT: '*',
    DIV: '/',
    LPAREN: '(',
    RPAREN: ')',
    POW: '**',
}

export default function run(text) {
    const tokenizer = new Tokenizer(text);
    const tokens = tokenizer.makeTokens();

    return tokens;
}