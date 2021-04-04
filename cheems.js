'use strict'

import run from './src/tokenizer.js';
import makeConversion from './src/converter.js'

(() => {
    const sentence = '$PI * (5^2)';
    const tokens = run(sentence);
    const convertedTokens = makeConversion(tokens);
    const testString = convertedTokens.join(' ');

    console.log(testString, '=', eval(testString));
}).call(this);