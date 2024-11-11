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


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));






/// Get Combined Data
app.get('/combinedData', (req, res) => {
  const query = `
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
      u.user_id = c.user_id
    ORDER BY
      u.user_id;
  `;

  pool.query(query)
    .then((result) => {
      res.header({
        'Content-type': 'application/json'
      });
      res.json(result.rows);
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(500).send('Server error');
    });
});


/// Adds new user
/// Adds new user
app.get('/addNewUser', (req, res) => {
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const gender = req.query.gender;
  const date_birth = req.query.date_birth;
  const phone_number = req.query.phone_number;
  const address = req.query.address;
  const email = req.query.email;
  
  const query = `
    CALL add_new_user(
      '${first_name}',
      '${last_name}',
      '${gender}',
      '${date_birth}',
      '${phone_number}',
      '${address}',
      '${email}'
    );
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



/// Gets search results
app.get('/searchResults', (req, res) => {
  const queryText = req.query.queryText;
  const queryType = req.query.queryType;
  console.log('Quety Text: ' + queryText + ' Query Type: ' + queryType);
  // Check if queryText is an integer
  const isNumeric = !isNaN(queryText);

  const query = `
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
      u.user_id = c.user_id
  WHERE
      ${isNumeric ? `CAST(${queryType} AS TEXT) LIKE '%${queryText}%'` : `LOWER(${queryType}) LIKE LOWER('%${queryText}%')`};
  `;

  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Server error');
    } else {
      res.json(result.rows);
    }
  });
});


/// Edits existing data
app.get('/updateData', (req, res) => {
  const user_id = req.query.user_id;
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const gender = req.query.gender;
  const date_birth = req.query.date_birth;
  const phone_number = req.query.phone_number;
  const address = req.query.address;
  const email = req.query.email;

  const query =
  `
    UPDATE 
      users
    SET
      first_name = '${first_name}',
      last_name = '${last_name}',
      gender = '${gender}',
      date_of_birth = '${date_birth}'
    WHERE
      user_id = ${user_id};

    UPDATE 
      contact_information
    SET
      phone_number = ${phone_number},
      address = '${address}',
      email = '${email}'
    WHERE
      user_id = ${user_id};  
  `

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
})


/// deletes patient with id
app.delete('/deletePatient', (req, res) => {
  console.log('Received Data is:', req.body);

  const userId = req.body.userId; // Get the userId from the request body
  const query = 
  `
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