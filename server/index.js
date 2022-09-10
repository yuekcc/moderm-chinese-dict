import express from 'express';
import path from 'path';
import { findWords } from './_db.js';
import { cutWords } from './_word.js';

const port = 10086;
const app = express();

app.get('/api/search', (req, res) => {
  const keyword = req.query.keyword || '';
  const withins = /true/i.test(req.query.withins || 'false'); // 包含相关词组
  console.log('[/api/search] keyword = %s, withins = %s', keyword, withins);

  const parsed = cutWords(keyword);
  const result = findWords(parsed, withins);
  res.json(result);
});
app.use('/', express.static(path.resolve(process.cwd(), 'dist')));

app.listen(port, () => {
  console.log('host at http://localhost:%d', port);
});
