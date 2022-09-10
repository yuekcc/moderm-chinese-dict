import { findWords } from './_db.js';

findWords(['汉', '字']).forEach(it => {
  console.log(it.entry, it.paraphrase);
});
