'use strict';

import Memory from './memory.js';

/**
 * This class contains utility methods to tokenise
 */
class Tokenizer {
    /**
     * Constructor method for Tokenizer class
     * @param {String} text to be processed
     */
    constructor(text) {
        this.text = text;
        this.position = -1;
        this.currentCharacter = null;
        this.advance();
    }

    /**
     * Goes to the next position of this.text
     */
    advance() {
        this.position++;
        this.currentCharacter = this.position < this.text.length ? this.text[this.position] : null;
    }

    /**
     * Processes text in order to generate a number as a string
     * @returns a number as a string
     */
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

    /**
     * Processes text in order to generate a word
     * @returns a number as a string
     */
    makeWord() {
        let wordStr = '';

        while (this.currentCharacter !== null &&
            TokenTypes.CHARS.includes(this.currentCharacter) ||
            TokenTypes.DIGITS.includes(this.currentCharacter)) {

            wordStr += this.currentCharacter;
            this.advance();
        }

        return wordStr;
    }

    /**
     * Processes text in order to buid a quoted string
     * @returns quoted string
     */
    makeString() {
        let str = '"';

        this.advance();

        while (this.currentCharacter !== null) {
            if (this.currentCharacter === '"') {
                str += '"';
                this.advance();
                return str;
            }

            str += this.currentCharacter;
            this.advance();
        }

        return str;
    }

    /**
     * Processes text in order to generate a variable
     * @returns a number as a string
     */
    makeVariable() {
        let varStr = '';

        while (this.currentCharacter !== null &&
            TokenTypes.CHARS.includes(this.currentCharacter) ||
            TokenTypes.DIGITS.includes(this.currentCharacter) ||
            this.currentCharacter === '$') {

            varStr += this.currentCharacter;
            this.advance();
        }

        return varStr;
    }

    /**
     * Creates tokens and returns them as a string array
     * @returns array of tokens
     */
    makeTokens() {
        const tokens = [];

        while (this.currentCharacter !== null) {
            if (' \t'.includes(this.currentCharacter)) {
                this.advance();
            } else if (TokenTypes.DIGITS.includes(this.currentCharacter)) {
                tokens.push(this.makeNumbers());
            } else if (TokenTypes.CHARS.includes(this.currentCharacter)) {
                tokens.push(this.makeWord());
            } else if (this.currentCharacter === '$') {
                tokens.push(this.makeVariable());
            } else if (this.currentCharacter === '"') {
                tokens.push(this.makeString());
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
            } else if (this.currentCharacter === '=') {
                tokens.push(TokenTypes.ASSIGN);
                this.advance();
            } else {
                throw new Error(`Illegal Character at 0:${this.position}`);
            }
        }

        return tokens;
    }
}

/**
 * Supported tokens
 */
const TokenTypes = {
    CHARS: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_',
    DIGITS: '0123456789',
    NUMBER: 'NUMBER',
    PLUS: '+',
    MINUS: '-',
    MULT: '*',
    DIV: '/',
    LPAREN: '(',
    RPAREN: ')',
    POW: '**',
    ASSIGN: '='
}

/**
 * Exported function that runs Tokenizer methods
 * 
 * @param {String} text code to be tokenised
 * @returns {Array.<String>} tokens Tokens generated by Tokenizer
 */
export default function run(text) {
    const tokenizer = new Tokenizer(text);
    const tokens = tokenizer.makeTokens();

    return tokens;
}