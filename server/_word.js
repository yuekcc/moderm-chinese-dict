import jieba from '@node-rs/jieba';

jieba.load();

export function cutWords(str) {
  return jieba.cutAll(str);
}
