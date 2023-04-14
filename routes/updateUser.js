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
const hashPassword = (password) => {
  const salt = 'somerandomstring'; 
  const hash = crypto.createHmac('sha256', salt)
                   .update(password)
                   .digest('hex');
  return hash;
};


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { Fname, username, email, phone, newpassword} = req.body;
    const hashedPassword = hashPassword(newpassword); 

    pool.query(
        'UPDATE editors SET full_name = ?, username = ?, email = ?, phone_number = ?, password = ? WHERE id = ?'
        ,[Fname, username, email, phone, hashedPassword, id],
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