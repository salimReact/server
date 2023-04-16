const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});



router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { Fname, username, email, phone , aboutme} = req.body;

    pool.query(
        'UPDATE users u JOIN editor_details e ON u.id = e.user_id SET u.full_name = ?,  u.email = ?,  u.phone_number = ?,  u.aboutMe = ?,  e.username = ? WHERE u.id = ?'
        ,[Fname, email, phone, aboutme,username, id],
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