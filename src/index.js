'use strict'

import run from './tokenizer.js';

(() => {
    const sentence = '25^7/1+62';
    const tokens = run(sentence);
    const str = tokens.join(' ');

    console.log(str, '=', eval(str));
}).call(this);