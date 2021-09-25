const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(3333, () => {
  console.log('Back rodando na porta 3333');
});
