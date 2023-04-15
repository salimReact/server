const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const path = require('path');
const multer = require('multer');

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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './Images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    },
  });
  
  const upload = multer({ storage: storage });
  
  router.post('/', upload.single('image'), (req, res) => {
    const { Fname, username, email, phone, password, gender, community_type } = req.body;
    const imagePath = req.file.filename; 
    const hashedPassword = hashPassword(password); 
  
    pool.query("INSERT INTO user (full_name, username, email, phone_number, password, gender, community_type, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [Fname, username, email, phone, hashedPassword, gender, JSON.stringify(community_type), imagePath],
      (err, result) => {
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