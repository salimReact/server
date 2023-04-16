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


const getUserByIdAndPassword = (id, password, callback) => {
  const hashedPassword = hashPassword(password);
  pool.query(
    "SELECT * FROM users WHERE id = ? AND password = ?",
    [id, hashedPassword],
    callback
  );
};

module.exports = {
  getUserByIdAndPassword
};