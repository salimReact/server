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
  const { Fname, username, email, phone, password, gender, community_type, role ,companyName, companyType, companyPhone, companyEmail, companyDomaine} = req.body;
  const imagePath = req.file.filename; 
  const hashedPassword = hashPassword(password); 

  pool.query("INSERT INTO users (full_name, email, phone_number, gender, image , password, role) VALUES (?, ?, ?, ?, ? , ?, ?)",
    [Fname, email, phone, gender, imagePath , hashedPassword ,role],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error registering user" });
      } else {
        const user_id = result.insertId;

        if (role === '1') {
          pool.query("INSERT INTO editor_details (user_id, username, community_type) VALUES (?, ?, ?)",
            [user_id, username, JSON.stringify(community_type)],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Error registering user as editor" });
              } else {
                res.status(200).json({ message: "User registered successfully as editor" });
              }
            }
          );
        } else if (role === '2') {
          // Insert a row into the announcer_details table for the new user
          pool.query("INSERT INTO announcer_details (user_id, companyName, companyType, companyPhone , companyEmail ,companyDomaine) VALUES (?, ?, ?, ? , ? , ?)",
            [user_id, companyName, companyType, companyPhone, companyEmail, companyDomaine],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Error registering user as announcer" });
              } else {
                res.status(200).json({ message: "User registered successfully as announcer" });
              }
            }
          );
        } else {
          res.status(400).json({ message: "Invalid role value" });
        }
      }
    }
  );
});

module.exports = router;