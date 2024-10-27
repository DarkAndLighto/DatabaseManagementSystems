// query.js
async function selectAllFromTable(pool, tableName, res) {
    try {
      const result = await pool.query(`SELECT * FROM ${tableName}`);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
  
  function setupRoutes(app) {
    const pool = app.get('pool'); // Access the pool from the app
  
    // Define routes to fetch data from PostgreSQL
    app.get('/users', async (req, res) => {
      await selectAllFromTable(pool, 'users', res);
    });
  
    app.get('/person', async (req, res) => {
      await selectAllFromTable(pool, 'person', res);
    });
  }
  
  module.exports = { setupRoutes };
  