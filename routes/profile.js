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

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  pool.query("SELECT * FROM users u JOIN editor_details ed ON u.id = ed.user_id;", [userId], (err, result) => {
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
