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
    JOIN
      patient p
    ON
      p.patient_id = c.user_id
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
    res.status(400).send({ error: error.message });
  });
});

/// Gets search results
app.get('/searchResults', (req, res) => {
  const queryText = req.query.queryText;
  const queryType = req.query.queryType;
  console.log('Search results for: Query Text: ' + queryText + ' Query Type: ' + queryType);
  // Check if queryText is an integer
  const isNumeric = !isNaN(queryText);

  const query = `
  SELECT
    *
  FROM
    users u
  JOIN
    contact_information c
  ON
    u.user_id = c.user_id
  JOIN
    patient p
  ON
    u.user_id = p.patient_id
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
      res.status(400).send({ error: error.message });
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












///////////////////// PATIENT PROFILE PAGE ////////////////////////////


app.get('/newEmCon', (req, res) => {
  const patient_id = req.query.patient_id;
  console.log("Adding em con to patient ID: " + patient_id);
  console.log(`newEmCon: Adding emergency contact to patient ${patient_id}`);
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const gender = req.query.gender;
  const date_of_birth = req.query.date_birth;
  const relationship = req.query.relationship;
  const phone_number = req.query.phone_number;
  const address = req.query.address;
  const email = req.query.email;

  const query = 
  `
    CALL add_emergency_contact(
    '${patient_id}',
    '${first_name}',
    '${last_name}',
    '${gender}',
    '${date_of_birth}',
    '${relationship}',
    '${phone_number}',
    '${address}',
    '${email}'
    );
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

app.get('/addBalanceToPatient', (req, res) => {
  let amount = req.query.amount;
  let patient_id = req.query.patient_id;

  console.log(`===== Chaing account balance of user ${patient_id} by ${amount}`);
  
  const query =
  `
    UPDATE patient
    SET balance = balance + ${amount}
    WHERE patient_id = ${patient_id};
  `;

  pool.query(query)
  .then((results) => {
    res.header({
      'Content-type': 'application/json'
    });
    res.send(results.rows);  // Send the query results
  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Server error');
  });
})

app.get('/getAppointmentsAndPayments', (req, res) => {
  let patient_id = req.query.patient_id;

  let query = `
    SELECT * FROM appointments a
    JOIN payments p
    ON a.appointment_id = p.appointment_id
    JOIN patient
    ON patient.patient_id = a.patient_id
    WHERE patient.patient_id = ${patient_id};
  `;

  
  pool.query(query)
    .then((results) => {
      res.header({
        'Content-type': 'application/json'
      });
      res.send(results.rows);  // Send the query results
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(500).send('Server error');
    });
});

app.get('/processAppointment', (req, res) => {
  let appointment_id = req.query.appointment_id;

  console.log(`===== processAppointment: appointment_id ${appointment_id}`);
  let query = `
    CALL process_appointment(${appointment_id});
  `;

  
  pool.query(query)
    .then((results) => {
      res.header({
        'Content-type': 'application/json'
      });
      res.send(results.rows);  // Send the query results
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(500).send('Server error');
    });
})

app.get('/getPrescriptions', (req, res) => {
  let appointment_id = req.query.appointment_id;

  console.log(`===== getPrescriptions: appointment_id ${appointment_id}`);
  let query = 
  `
    SELECT * FROM prescriptions p
    JOIN Prescription_Medications pm
    ON p.prescription_ID = pm.prescription_ID
    JOIN Medications m
    ON pm.medication_ID = m.medication_ID
    WHERE appointment_id = ${appointment_id};
  `;

  pool.query(query)
    .then((results) => {
      res.header({
        'Content-type': 'application/json'
      });
      res.send(results.rows);  // Send the query results
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(500).send('Server error');
    });
})

















///////////////////// BOOK APPOINTMENT PAGE ////////////////////////////


app.get('/bookNewAppointment', (req, res) => {
  console.log(`===== Adding new appointment`);
  let patient_id = req.query.patient_id;
  let doctor_id = req.query.doctor_id;
  let app_date = req.query.app_date;
  let app_status = req.query.app_status;
  let department_name = req.query.department_name;

  console.log(`===== Adding new appointment patient_id ${patient_id} doctor_id ${doctor_id} app_date ${app_date} app_status ${app_status} department_name ${department_name}`);
  query = 
  `
    CALL book_new_appointment(${patient_id}, ${doctor_id}, '${app_date}', '${app_status}');
  `

  pool.query(query)
  .then(() => {
    res.header({
      'Content-type': 'application/json'
    });
    res.send({ success: true });
  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Server error');
  });
})























///////////////////////////// GENEREAL  ///////////////////////////////////

app.get('/newRecord', (req, res) => {
  const table_name = req.query.table_name;
  delete req.query.table_name; // Remove table_name from the query object

  const columns = Object.keys(req.query).join(', ');
  const values = Object.values(req.query).map(value => `'${value}'`).join(', ');

  console.log(`===== newRecord: Adding record to table ${table_name}`);
  console.log(`Columns: ${columns}`);
  console.log(`Values: ${values}`);

  const query = `
    INSERT INTO ${table_name} (${columns})
    VALUES (${values});
  `;

  pool.query(query)
    .then(() => {
      res.header({
        'Content-type': 'application/json'
      });
      res.send({ success: true });
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(400).send({ error: error.message });
    });
});

app.get('/updateRecord', (req, res) => {
  const table_name = req.query.table_name;
  const column = req.query.column;
  const row = req.query.row;
  
  delete req.query.table_name;  // Remove table_name from the query object
  delete req.query.column;   // Remove id_column from the query object
  delete req.query.row;    // Remove id_value from the query object

  const updates = Object.keys(req.query).map(key => `${key.trim()} = '${req.query[key].trim()}'`).join(', ');

  console.log(`===== updateRecord: Updating record in table ${table_name} with id ${row} on column ${column}`);
  console.log(`Updates: ${updates}`);

  const query = 
  `
    UPDATE ${table_name}
    SET ${updates}
    WHERE ${column} = '${row}';
  `;

  pool.query(query)
    .then(() => {
      res.header({
        'Content-type': 'application/json'
      });
      res.send({ success: true });
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(400).send({ error: error.message });
    });
});

app.get('/getRowsFromTable', (req, res) => {
  const table_name = req.query.table_name;

  console.log(` ===== getRowsFromTable: We are getting all rows from table ${table_name}`);

  const query = 
  `
    SELECT * FROM ${table_name};
  `;

  pool.query(query)
  .then((results) => {
    res.header({
      'Content-type': 'application/json'
    });
    res.send(results.rows);  // Send the query results
  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Server error');
  });
})

app.get('/getRowFromTable', (req, res) => {
  const table_name = req.query.table_name;
  const column = req.query.column;
  const row = req.query.row;

  const isNumeric = !isNaN(row);
  console.log(`===== getRowFromTable: Getting row: ${row} from table ${table_name} based on column ${column}`);

  const query = 
  `
    SELECT * FROM ${table_name}
    WHERE ${isNumeric ? `CAST(${column} AS TEXT) LIKE '%${row}%'` : `LOWER(${column}) LIKE LOWER('%${row}%')`};
  `;

  pool.query(query)
  .then((results) => {
    res.header({
      'Content-type': 'application/json'
    });
    res.send(results.rows);  // Send the query results
  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Server error');
  });
});

app.get('/getRowsFromTableSorted', (req, res) => {
  const table_name = req.query.table_name;

  console.log(`===== getRowFromTable: Getting all rows from table ${table_name} SORTED`);

  fetch(`http://localhost:5000/getPrimaryKey?table_name=${table_name}`)
  .then(response => response.json())
  .then(data => {
    const primaryKey = data.primary_key;

    const dataQuery = `
      SELECT * FROM ${table_name}
      ORDER BY ${primaryKey} ASC;
    `;

    return pool.query(dataQuery);
  })
  .then((results) => {
    res.header({ 'Content-type': 'application/json' });
    res.send(results.rows);
  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Server error');
  });
});

app.get('/getRowFromTableSorted', (req, res) => {
  const table_name = req.query.table_name;
  const column = req.query.column;
  const row = req.query.row;

  console.log(`===== getRowFromTable: Getting row ${row} from table ${table_name} based on column ${column}`);

  fetch(`http://localhost:5000/getPrimaryKey?table_name=${table_name}`)
  .then(response => response.json())
  .then(data => {
    const primaryKey = data.primary_key;

    const dataQuery = `
      SELECT * FROM ${table_name}
      WHERE ${column} = $1
      ORDER BY ${primaryKey} ASC;
    `;

    return pool.query(dataQuery, [row]);
  })
  .then((results) => {
    res.header({ 'Content-type': 'application/json' });
    res.send(results.rows);
  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Server error');
  });
});

app.get('/dropRowFromTable', (req, res) => {
  const table_name = req.query.table_name;
  const column = req.query.column;
  const row = req.query.row;

  console.log(` ===== dropRowFromTable: We are deleting row ${row} from table ${table_name} based on column ${column}`);

  const query =
  `
    DELETE FROM ${table_name}
    WHERE ${column} = ${row};
  `

  pool.query(query)
  .then(() => {
    res.json({ success: true });
  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Server error');
  });
})

app.get('/searchRowsFromTable', (req, res) => {
  const table_name = req.query.table_name;
  const column = req.query.column;
  const row = req.query.row;

  console.log(`===== searchRowsFromTable: We are getting row id: "${row}" from table ${table_name} based on row name ${column}`);
  
  const isNumeric = !isNaN(row);
  
  const query = `
    SELECT * FROM ${table_name}
    WHERE ${isNumeric ? `CAST(${column} AS TEXT) LIKE '%${row}%'` : `LOWER(${column}) LIKE LOWER('%${row}%')`};
  `;

  pool.query(query)
  .then((results) => {
    res.header({
      'Content-type': 'application/json'
    });
    res.send(results.rows);  // Send the query results
  })
  .catch((error) => {
    console.error('Error executing query:', error);
    res.status(500).send('Server error');
  });
});

app.get('/searchRowsFromJoinedTables', (req, res) => {
  const table_name = req.query.table_name;
  const table_name_2 = req.query.table_name_2;
  const join_row_1 = req.query.join_row_1;
  const join_row_2 = req.query.join_row_2;
  const column = req.query.column;
  const row = req.query.row;

  console.log(`===== searchRowsFromJoinedTables: We are getting row id: ${row} from table1 ${table_name} based on row name ${column} joined on table2 ${table_name_2} based on join_row_1 ${join_row_1} = join_row_2 ${join_row_2}`);
  
  const isNumeric = !isNaN(row);

  const query = `
    SELECT 
      * FROM ${table_name} t1
    JOIN
      ${table_name_2} t2
    ON
      t1.${join_row_1} = t2.${join_row_2}
    WHERE 
      ${isNumeric ? `CAST(t1.${column} AS TEXT) LIKE '%${row}%'` : `LOWER(t1.${column}) LIKE LOWER('%${row}%')`};
  `;

  console.log("Constructed Query:", query);  // Log the constructed query for debugging

  pool.query(query)
    .then((results) => {
      res.header({
        'Content-type': 'application/json'
      });
      res.send(results.rows);  // Send the query results
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(500).send('Server error');
    });
});

app.get('/searchRowsTwoConditionsFromTable', (req, res) => {
  const table_name = req.query.table_name;
  const column_1 = req.query.column_1;
  const column_2 = req.query.column_2;
  const row_1 = req.query.row_1;
  const row_2 = req.query.row_2;

  console.log(`===== searchRowsTwoConditionsFromTable: We are getting column_1 ${column_1} based on row_1 ${row_1} and column_2 ${column_2} based on row_2 ${row_2} from table_name ${table_name}`);
  
  const isNumeric = !isNaN(row_1);
  const isNumeric2 = !isNaN(row_2);

  const query = 
  `  
    SELECT 
      *
    FROM 
      ${table_name}
    WHERE 
      ${isNumeric ? `CAST(${column_1} AS TEXT) LIKE '%${row_1}%'` : `LOWER(${column_1}) LIKE LOWER('%${row_1}%')`}
    AND
      ${isNumeric2 ? `CAST(${column_2} AS TEXT) LIKE '%${row_2}%'` : `LOWER(${column_2}) LIKE LOWER('%${row_2}%')`};
  `;

  pool.query(query)
    .then((results) => {
      res.header({
        'Content-type': 'application/json'
      });
      res.send(results.rows);  // Send the query results
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(500).send('Server error');
    });
})

app.get('/searchRowsOneConditionFromThreeTables', (req, res) => {
  let table_1 = req.query.table_1;
  let table_2 = req.query.table_2;
  let table_3 = req.query.table_3;
  let join_column_1 = req.query.join_column_1;
  let join_column_2 = req.query.join_column_2;
  let join_column_3 = req.query.join_column_3;
  let column_1 = req.query.column_1;
  let row_1 = req.query.row_1;

  console.log(`===== searchRowsOneConditionFromThreeTables: We are joining table_1 ${table_1} with table_2 ${table_2} on join_column_1 ${join_column_1} and table_3 ${table_3} on join_column_2 ${join_column_2}`);
  console.log(`==THEN=== filtering based on column_1 ${column_1} and row_1 ${row_1}`);

  let query = 
  `
    SELECT  * FROM ${table_1} t1
    JOIN ${table_2} t2 
    ON t1.${join_column_1} = t2.${join_column_2}
    JOIN ${table_3} t3
    ON t1.${join_column_1} = t3.${join_column_3}
    WHERE  ${column_1} = ${row_1}; 
  `

  pool.query(query)
    .then((results) => {
      res.header({
        'Content-type': 'application/json'
      });
      res.send(results.rows);  // Send the query results
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      res.status(500).send('Server error');
    });
})

/* 
SELECT 
    *
FROM 
    users u
JOIN
    doctors d
ON
    u.user_id = d.doctor_id
JOIN
    contact_information c
ON
    u.user_id = c.user_id
WHERE 
    department_id = 2; 
*/
















/////////////////////////// MISC /////////////////////////////////////

app.get('/getPrimaryKey', (req, res) => {
  const table_name = req.query.table_name;

  const primaryKeyQuery = `
    SELECT kcu.column_name
    FROM information_schema.table_constraints tc 
    JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_name = $1 AND tc.constraint_type = 'PRIMARY KEY';
  `;

  pool.query(primaryKeyQuery, [table_name])
    .then((results) => {
      if (results.rows.length === 0) {
        return res.status(400).send('Primary key not found for the specified table.');
      }
      res.header({
        'Content-type': 'application/json'
      });
      res.send({ primary_key: results.rows[0].column_name });
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