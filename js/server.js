// server.js
const express = require('express');
const cors = require('cors'); // Optional, for handling cross-origin requests
const { Pool } = require('pg'); // Import Pool directly in server.js
var bodyParser = require('body-parser')
const path = require('path'); // Import the path module


const app = express();
app.use(cors()); // If needed

// Set up PostgreSQL connection using `pg` Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'MainData',
  password: '12345678',
  port: 5432,
});

app.set('pool', pool); 
/* By using app.set('pool', pool);, we're making the pool instance accessible throughout the application. 
This allows other parts of the app to reference the same pool without redefining it. */

const { setupRoutes } = require('./query'); // Import the function from query.js
setupRoutes(app); // Set up routes





/* app.get('/combinedData', async(req, res) => {
  try {
    const result = await pool.query(`SELECT 
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
    u.user_id = c.user_id;`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}); */


var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submissions with urlencodedParser middleware
app.post('/hello', urlencodedParser, (req, res) => {
    console.log('Received Form Data:', req.body);
    res.send(res.body);
});

app.get('/page', urlencodedParser, (req, res) => {
  // res.send(bb);
});

// Start the server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
