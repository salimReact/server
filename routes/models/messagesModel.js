const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});
module.exports = {
    addMessage: function(message, id_sender, id_receiver) {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(err);
          } else {
            connection.query(
              'INSERT INTO messages (msg, id_sender, id_receiver) VALUES (?, ?, ?)',
              [message, id_sender, id_receiver],
              (err, results) => {
                connection.release();
                if (err) {
                  reject(err);
                } else {
                  resolve(results.insertId);
                }
              }
            );
          }
        });
      });
    }
  };