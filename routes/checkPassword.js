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

const crypto = require('crypto');
const hashPassword = (password) => {
  const salt = 'somerandomstring'; 
  const hash = crypto.createHmac('sha256', salt)
                   .update(password)
                   .digest('hex');
  return hash;
};


router.post("/:id",(req,res)=>{
    const id = req.params.id;
    const { password } = req.body;
    const hashedPassword = hashPassword(password); 

 
   pool.query("SELECT * FROM editors WHERE id = ? AND password = ?",
     [id, hashedPassword],
     (err, result) => {
       if (err) {
         res.send({ err: err });     
       } else {
         if (result.length > 0) {
           res.send({ message: "correct password " });
         } else {
           res.send({ message: "Wrong password" });
         }
       }
       
     }
   );
 });
 module.exports = router;


