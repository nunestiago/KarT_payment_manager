require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./router');

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('Back rodando na porta 3333');
});
