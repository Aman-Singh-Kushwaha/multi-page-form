const fs = require('fs');
const pool = require('../config/db.js');

const migrateDatabase = async () => {
  try {
    const sql = fs.readFileSync('./migrations/init.sql', 'utf8');
    await pool.query(sql);
    console.log('✅ Database migrated successfully');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    pool.end();
  }
};

migrateDatabase();
