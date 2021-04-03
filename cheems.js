'use strict'

import run from './src/tokenizer.js';

(() => {
    const sentence = '"Machi" + " No " + "Dorufin " + "🐬"';
    const tokens = run(sentence);
    const str = tokens.join(' ');

    console.log(str, '=', eval(str));
}).call(this);