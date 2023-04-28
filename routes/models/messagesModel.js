const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

module.exports = {
  addMessage: function(message, senderId, receiverId) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(
            'INSERT INTO conversations (sender_id, receiver_id) VALUES (?, ?)',
            [senderId, receiverId],
            (err, results) => {
              if (err) {
                connection.rollback(() => {
                  connection.release();
                  reject(err);
                });
              } else {
                const conversationId = results.insertId;
                connection.query(
                  'INSERT INTO messages (conversation_id, message, timestamp, sender_id,receiver_id) VALUES (?, ?, ?, ?,?)',
                  [conversationId, message, Date.now(), senderId,receiverId],
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
            }
          );
        }
      });
    });
  }
};