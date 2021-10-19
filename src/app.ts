require('dotenv').config();
import express from 'express';
import cors from 'cors';
import routes from './router';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('Back rodando na porta 3333');
});
