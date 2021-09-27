require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    tableName: 'knex_migrations',
  },
});

module.exports = knex;
