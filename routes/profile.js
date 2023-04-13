const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const crypto = require('crypto');

// create the connection to database
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

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  pool.query("SELECT * FROM editors WHERE id = ?", [userId], (err, result) => {
    if (err) {
      res.send({ err: err });     
    } else {
      if (result.length > 0) {
        res.send({ data: result[0] });
      } else {
        res.send({ message: "No data found" });
      }
    }
  });
});

module.exports = router;
