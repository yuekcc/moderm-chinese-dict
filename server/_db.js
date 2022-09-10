import Sqlite from 'better-sqlite3';
const DB_FILE = './data/dict.db';

const database = new Sqlite(DB_FILE);

function _findWords(keywords = []) {
  const sql = `select entry, paraphrase from mdx where entry in (${keywords.map(() => '?').join(',')})`;
  const parpared = database.prepare(sql);
  return parpared.all([...keywords]) || [];
}

export function findWords(keywords = [], withins = false) {
  if (!withins) {
    return _findWords(keywords);
  }

  const result = [];
  keywords.forEach(word => {
    const sql = `select entry, paraphrase from mdx where entry like ?`; // TODO 优化
    const parpared = database.prepare(sql);
    const records = parpared.all([`%${word}%`]) || [];
    result.push(...records);
  });

  return result;
}
