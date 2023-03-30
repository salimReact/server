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
    const { email, password } = req.body;
 
   pool.query("SELECT * FROM editors WHERE email = ? AND password = ?",
     [email, password],
     (err, result) => {
       if (err) {
         res.send({ err: err });     
       } else {
         if (result.length > 0) {
           res.send({ message: "Login successful" });
         } else {
           res.send({ message: "Wrong email or password" });
         }
       }
       
     }
   );
 });
 module.exports = router;


