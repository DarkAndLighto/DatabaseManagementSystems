// server.js
const express = require('express');
const cors = require('cors'); // Optional, for handling cross-origin requests
const { Pool } = require('pg'); // Import Pool directly in server.js
var bodyParser = require('body-parser')
const path = require('path'); // Import the path module
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const app = express();
app.use(cors()); // If needed

app.use(express.json());
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

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));









/// adds new user with contact info to patients
app.post('/hello', urlencodedParser, (req, res) => {
  console.log('Received Form Data is: ', req.body);

  const { first_name, last_name, gender, date_birth, phone_number, address, email } = req.body;

  // Ensure the SQL query uses the correct values from the request body
  const query = `
    DO $$ 
    DECLARE 
      new_user_id INT;
    BEGIN
      INSERT INTO users (first_name, last_name, gender, date_of_birth)
      VALUES ('${first_name}', '${last_name}', '${gender}', '${date_birth}')
      RETURNING user_id INTO new_user_id;

      INSERT INTO contact_information (user_id, phone_number, address, email) 
      VALUES (new_user_id, '${phone_number}', '${address}', '${email}');

      INSERT INTO patient(patient_id)
      VALUES (new_user_id);
    END $$;
  `;

  pool.query(query)
    .then(() => {
      res.header({
        'Content-type': 'application/json'
      });
      res.send(req.body);
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(500).send('Server error');
    });
});

/// deletes patient with id
app.delete('/deletePatient', (req, res) => {
  console.log('Received Form Data is:', req.body);

  const userId = req.body.userId; // Get the userId from the request body
  const query = `
  DELETE FROM users
  WHERE user_id = ${userId};
  `;

  pool.query(query)
      .then(() => {
          res.json({ success: true });
      })
      .catch((error) => {
          console.error('Error executing query:', error);
          res.status(500).send('Server error');
      });
});







// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});