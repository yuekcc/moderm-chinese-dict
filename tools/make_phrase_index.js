import { DB } from './_db.js';
import { chunk } from 'lodash-es';

const countByEntry = DB.prepare('select entry, targets from phrase_index where entry = ?');
const insertWithNewIndex = DB.prepare(`insert into phrase_index(entry, targets) values (?, ?)`);
const updateWithNewIndex = DB.prepare(`update phrase_index set targets = ? where entry = ?`);

function freshIndex(hanzi, targets = []) {
  const exists = countByEntry.get([hanzi]);
  if (exists) {
    const existsTargets = exists.targets || '';
    const updated = Array.from(new Set([...existsTargets.split(','), ...targets]));
    updateWithNewIndex.run([updated.join(','), hanzi]);
  } else {
    insertWithNewIndex.run([hanzi, targets.join('')]);
  }
}

const selectAllEntry = DB.prepare('select entry from mdx');
const rows = selectAllEntry.all();
const pagedRows = chunk(rows, 5000);

function update(data) {
  return new Promise(resolve => {
    let count = 0;
    for (const row of data) {
      const entry = row.entry || '';
      entry.split('').forEach(hanzi => {
        freshIndex(hanzi, [entry]);
        count++;
      });
    }

    console.log('parsed, total =', count);
    resolve(count);
  });
}

!(async () => {
  const results = await Promise.all(pagedRows.map(data => update(data)));
  console.log('----\nALL DONE. results =', results);
})();
