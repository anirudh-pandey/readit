const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reddit',
  password: 'anirudh',
  port: 5433,
});

// create this type of client end system too to save pool memory.
const queryWithRowMode = async (rowMode, text, params) => {
  const client = await pool.connect();
  return await client.query({
    text,
    values: params,
    rowMode,
  });
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  query1: (rowMode, text, params) => queryWithRowMode(rowMode, text, params)
};
