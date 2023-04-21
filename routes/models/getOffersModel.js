const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

exports.getOfferByEdId = async (edId) => {
  try {
    const query = `
      SELECT *
      FROM campaign
      WHERE FIND_IN_SET(?, id_list)
    `;
    const [rows] = await pool.promise().execute(query, [edId]);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};