import fs from 'fs';

const structNames = {
  a: '左右结构',
  b: '上下结构',
  c: '独体结构',
  d: '半包围结构',
  e: '全包围结构',
  f: '品字结构',
  g: '上中下结构',
  h: '左中右结构',
};

const text = fs.readFileSync('../data/radicals.json', 'utf-8');
const Radicals = JSON.parse(text);
// console.log(Radicals);

function splitHanzi(line, radical) {
  let [radicalBihua, hanziList] = line.split(':');

  const result = [];
  const offset = 2;
  if (radical === '*') {
    hanziList = hanziList.replace(/[\d]+/g, '');
  }
  for (let i = 0; i < hanziList.length; i += offset) {
    const [hanzi, structType] = hanziList.slice(i, i + offset);
    result.push({ name: hanzi, structType, structName: structNames[structType] });
  }

  return {
    name: radical,
    bihua: parseInt(radicalBihua || '0'),
    hanzis: result,
  };
}

const radicalList = Object.keys(Radicals);
const doc = radicalList
  .map(radical => splitHanzi(Radicals[radical], radical))
  .reduce((dp, it) => {
    dp[it.name] = it;
    return dp;
  }, {});

const database = {
  radicalBihuaList: [...Array.from(new Set(Object.values(doc).map(it => it.bihua)))],
  radicalsGroupedByBihua: Object.values(doc).reduce((dp, it) => {
    const current = dp[it.bihua] || [];
    current.push(it.name);

    dp[it.bihua] = current;
    return dp;
  }, {}),
  hanzisGroupedByRadical: Object.keys(doc)
    .map(radical => doc[radical])
    .map(it => {
      return {
        [it.name]: it.hanzis.map(hanzi => hanzi.name),
      };
    })
    .reduce((dp, it) => {
      return { ...dp, ...it };
    }, {}),
};

fs.writeFileSync('../public/assets/radicals.json', JSON.stringify(database, null, 2), 'utf-8');
