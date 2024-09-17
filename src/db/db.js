const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'devin',
  host: 'localhost',
  database: 'music_tracker',
  password: 'riess',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
