const { Pool } = require('pg');

// Set up PostgreSQL connection using `pg` Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MainData',
    password: '12345678',
    port: 5432,
  });

module.exports = {pool}