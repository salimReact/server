const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

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

    connection.query('SELECT * FROM editors', (err, rows) => {
      connection.release(); // release the connection back to the pool
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).send('Internal server error');
        return;
      }

      // Send the retrieved data as JSON
      res.json(rows);
    });
  });
});

module.exports = router;
