const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'sys'
  });

function updateDevisStatus(id, newStatus, callback) {
  pool.query(
    'UPDATE devis SET status = ? WHERE idDevis = ?',
    [newStatus, id],
    (err, result) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        console.log(result.affectedRows + ' record(s) updated');
        callback(null, 'Status updated successfully');
      }
    }
  );
}

module.exports = {
    updateDevisStatus
};
