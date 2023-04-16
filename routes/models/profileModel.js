const mysql = require('mysql2');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

const getUserById = (id, callback) => {
  pool.query("SELECT * FROM users u LEFT JOIN editor_details ed ON u.id = ed.user_id LEFT JOIN announcer_details ad ON u.id = ad.user_id WHERE id=? ; ", [id], (err, result) => {
    if (err) {
      callback(err, null);     
    } else {
      if (result.length > 0) {
        callback(null, result[0]);
      } else {
        callback(null, null);
      }
    }
  });
};

module.exports = { getUserById };