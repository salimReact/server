const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});
module.exports = {
  addDevis: function(deliverable, nb_deliverable, price, devEd, devCampaign) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(
            'INSERT INTO devis (deliverable, nb_deliverable, price, devEd, devCampaign) VALUES (?, ?, ?, ?, ?)',
            [deliverable, nb_deliverable, price, devEd, devCampaign],
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