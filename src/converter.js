import Utils from './utils.js'

const keywords = {
    'nah': 'null',
    'imbisible': 'undefined',
    'tru': 'true',
    'falmse': 'false',
    'is': '===',
    'notis': '!==',
    'bonk': '!'
}

class Converter {
    constructor(tokens) {
        this.tokens = tokens;
    }

    returnVariable(text) {
        return `Memory.variables['${text}']`;
    }

    convertTokens() {
        let convertedTokens = [];

        for (const token of this.tokens) {
            if (Utils.isVariable(token)) {
                convertedTokens.push(this.returnVariable(token));
            } else if (keywords.hasOwnProperty(token)) {
                convertedTokens.push(keywords[token]);
            } else {
                convertedTokens.push(token);
            }
        }

        return convertedTokens;
    }
}

export default function makeConversion(tokens) {
    const converter = new Converter(tokens);
    const convertedTokens = converter.convertTokens();

    return convertedTokens;
}