import Memory from './memory.js'

const keywords = [
    'emstorage'
];

class Converter {
    constructor(tokens) {
        this.tokens = tokens;
    }

    isVariable(text) {
        if (text.startsWith('$')) {
            return true;
        }

        return false;
    }

    returnVariable(text) {
        if (Memory.variables[text] === undefined) {
            console.error(`[ERROR]: ${text} is not defined`);
            process.exit(0);
        }

        return Memory.variables[text];
    }

    convertTokens() {
        let convertedTokens = [];

        for (const token of this.tokens) {
            if (this.isVariable(token)) {
                convertedTokens.push(this.returnVariable(token));
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