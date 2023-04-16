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

    connection.query("SELECT * FROM users u LEFT JOIN editor_details ed ON u.id = ed.user_id LEFT JOIN announcer_details ad ON u.id = ad.user_id;", (err, rows) => {
      connection.release(); 
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).send('Internal server error');
        return;
      }

      const editedRows = rows.map(row => {
        const editedRow = { 
          id: row.id, 
          full_name: row.full_name, 
          email: row.email, 
          phone_number: row.phone_number, 
          gender: row.gender,
          image: row.image,
        };
        
        if (row.role === "1") {
          editedRow.username = row.username;
          editedRow.community_type = JSON.parse(row.community_type);
          editedRow.age = row.age;
        } else if (row.role === "2") {
          editedRow.companyName = row.companyName;
          editedRow.companyType = row.companyType;
        }
        
        return editedRow;
      });
      
      res.send(editedRows);
      
    });
  });
});

module.exports = router;