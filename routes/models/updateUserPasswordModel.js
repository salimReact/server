const mysql = require('mysql2');
const crypto = require('crypto');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

function updatePassword(id, newPassword, callback) {
  const salt = 'somerandomstring';
  const hashedPassword = crypto.createHmac('sha256', salt)
                                .update(newPassword)
                                .digest('hex');

  pool.query(
    'UPDATE users SET password = ?  WHERE id = ?',
    [hashedPassword, id],
    (err, result) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        console.log(result.affectedRows + ' record(s) updated');
        callback(null, 'Password updated successfully');
      }
    }
  );
}

module.exports = {
  updatePassword,
};
