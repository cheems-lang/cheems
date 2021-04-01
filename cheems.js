'use strict'

import run from './src/tokenizer.js';

(() => {
    const sentence = '3.141592 * (5 ^ 2)';
    const tokens = run(sentence);
    const str = tokens.join(' ');

    console.log(str, '=', eval(str));
}).call(this);