// server.js
const express = require('express');
const cors = require('cors'); // Optional, for handling cross-origin requests
const { Pool } = require('pg'); // Import Pool directly in server.js

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

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
