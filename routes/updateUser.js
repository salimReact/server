const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const crypto = require('crypto');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { Fname, username, email, phone, password } = req.body;
    pool.query(
        'UPDATE editors SET full_name = ?, username = ?, email = ?, phone_number = ?, password = ? WHERE id = ?'
        ,[Fname, username, email, phone, password, id],
                (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error updating data');
            } else {
                console.log(result.affectedRows + ' record(s) updated');
                res.send('Data updated successfully');
            }
        }
    );
});

module.exports = router;