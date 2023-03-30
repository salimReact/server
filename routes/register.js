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

router.post('/', (req, res) => {
  const { Fname, username, email, phone, password, gender,hobbies,image } = req.body;

  pool.query("INSERT INTO editors (full_name, username, email, phone_number, password,gender,hobbies,image) VALUES (?,?, ?, ?, ?, ?, ?, ?)",
  [Fname,username,email,phone,password,gender,JSON.stringify(hobbies),image],
  (err,result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error registering user" });
    } else {
      res.status(200).json({ message: "User registered successfully" });
    }
  }
  );
});

module.exports = router;