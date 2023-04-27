const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'sys'
  });

function updateContractStatus(id, newStatus, callback) {
  pool.query(
    'UPDATE contract SET status = ? WHERE cont_id = ?',
    [newStatus, id],
    (err, result) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        console.log(result.affectedRows + ' record(s) updated');
        callback(null, 'Data updated successfully');
      }
    }
  );
}

module.exports = {
  updateContractStatus,
};
