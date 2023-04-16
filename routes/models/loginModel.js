const mysql = require('mysql2');

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
class Login {
  static getByEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      const hashedPassword = hashPassword(password);
      pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, hashedPassword], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.length > 0) {
            const userId = result[0].id;
            resolve(userId);
          } else {
            reject(new Error("Wrong email or password"));
          }
        }
      });
    });
  }
}

module.exports = Login;