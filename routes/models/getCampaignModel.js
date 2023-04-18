const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

async function getCampaignModel() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM campaign');
    connection.release();
    
    // modify the rows to replace the id_list value with the number of IDs
    const modifiedRows = rows.map(row => {
      const idList = row.id_list || ''; // handle cases where id_list is null or undefined
      const idCount = idList.split(',').length;
      return { ...row, editorsCount: idCount };
    });
    
    return modifiedRows;
  } catch (error) {
    throw new Error(`Unable to get campaign data: ${error}`);
  }
}

module.exports = getCampaignModel;