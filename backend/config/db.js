const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect((err, _, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
    return;
  }

  console.log('Connected to PostgreSQL server');
  release();
});

module.exports = pool;