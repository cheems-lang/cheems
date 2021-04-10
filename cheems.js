'use strict'

import run from './src/tokenizer.js';
import makeConversion from './src/converter.js'
import Memory from "./src/memory.js";

(() => {
    const sentence = `$no = 1 notis 2`;
    const tokens = run(sentence);
    const convertedTokens = makeConversion(tokens);
    const testString = convertedTokens.join(' ');

    eval(testString);

    console.table(Memory.variables);
}).call(this);