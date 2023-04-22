const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

module.exports = {
    addContract: function(contract) {
      return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
          if (err) {
            reject(err);
          } else {
            connection.query(
              'INSERT INTO contract (object, cont_disc, period, an_id, ed_id) VALUES (?, ?, ?, ?, ?)',
              [contract.object, contract.cont_disc, contract.period, contract.an_id, contract.ed_id],
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