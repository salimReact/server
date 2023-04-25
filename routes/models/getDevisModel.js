const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'sys'
  });
  
  async function getDevisModel() {
    try {
      const [rows] = await pool.query('SELECT * FROM devis');
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Could not get devis');
    }
  }
  
  module.exports = { getDevisModel };