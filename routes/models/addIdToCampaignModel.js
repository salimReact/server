const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

function addIdToCampaignModel(campaignId, id, callback) {
  const sql = `SELECT inv_list FROM campaign WHERE idcampaign = ?`;
  pool.query(sql, [campaignId], (error, result) => {
    if (error) {
      return callback(error);
    }
    const invList = result[0].inv_list;
    const newInvList = invList ? `${invList},${id}` : id.toString();
    const updateSql = `UPDATE campaign SET inv_list = ? WHERE idcampaign = ?`;
    pool.query(updateSql, [newInvList, campaignId], (updateError, updateResult) => {
      if (updateError) {
        return callback(updateError);
      }
      return callback(null, updateResult);
    });
  });
}

module.exports = {
  addIdToCampaignModel
};