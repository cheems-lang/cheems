'use strict'

import run from './src/tokenizer.js';

(() => {
    const sentence = 'word+word2*(3 / word3)^word_4';
    const tokens = run(sentence);
    const str = tokens.join(' ');

    console.log(str);
}).call(this);