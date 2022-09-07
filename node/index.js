import express from 'express';
const port = 10086;
const app = express();

app.get('/', (req, res) => res.send('hello, from server side'));

app.listen(port, () => {
  console.log('host at http://localhost:%d', port);
});
