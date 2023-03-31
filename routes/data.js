const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const path = require('path');


// create the connection to database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      res.status(500).send('Internal server error');
      return;
    }

    connection.query('SELECT id ,full_name, username, email, phone_number, gender, hobbies, image FROM editors', (err, rows) => {
      connection.release(); // release the connection back to the pool
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).send('Internal server error');
        return;
      }

      // Send the retrieved data as JSON
      const editedRows = rows.map(row => {
        return { 
          id: row.id, 
          full_name: row.full_name, 
          username: row.username, 
          email: row.email, 
          phone_number: row.phone_number, 
          gender: row.gender, 
          hobbies: JSON.parse(row.hobbies), 
          image: row.image 
        };
      });
      res.json(editedRows);
    });
  });
});

module.exports = router;