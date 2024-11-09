// query.js
function setupRoutes(app) {
  const pool = app.get('pool'); // Access the pool from the app

  // Define routes to fetch data from PostgreSQL
  app.get('/users', async (req, res) => {
    await selectAllFromTable(pool, 'users', res);
  });

  app.get('/person', async (req, res) => {
    await selectAllFromTable(pool, 'person', res);
  });

  app.get('/combinedData', async(req, res) => {
    await GetCombinedData(pool, res)
  });
}

async function selectAllFromTable(pool, tableName, res) {
  try {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

async function GetCombinedData(pool, res)
{
  try {
    const result = await pool.query(`
      SELECT 
      u.user_id, 
      u.first_name, 
      u.last_name, 
      u.gender, 
      u.date_of_birth, 
      c.phone_number, 
      c.address, 
      c.email
    FROM 
      users u
    JOIN 
      contact_information c
    ON 
      u.user_id = c.user_id;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

module.exports = { setupRoutes };