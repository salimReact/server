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

router.post("/",(req,res)=>{

    const { Fname, email, phone, password, gender,companyName,companyEmail,companyPhone,companyDomaine,companyType } = req.body;


    pool.query("INSERT INTO annoncers (full_name, email, phone, password,gender,companyName,companyEmail,companyPhone,companyDomaine,companyType) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [Fname,email,phone,password,gender,companyName,companyEmail,companyPhone,companyDomaine,companyType],
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