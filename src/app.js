require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./router/usersRoutes');

const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(cors());

app.use(usersRoutes);

app.listen(3333, () => {
  console.log('Back rodando na porta 3333');
});
