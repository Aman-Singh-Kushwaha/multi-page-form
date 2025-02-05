const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('./prod-ca-2021.crt').toString()
  }
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
    return;
  }

  console.log('Connected to PostgreSQL server');
  release();
});

module.exports = pool;