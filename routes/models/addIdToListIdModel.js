const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

function addIdToListIdModel(campaignId, id, callback) {
  const sql = `SELECT id_list FROM campaign WHERE idcampaign = ?`;
  pool.query(sql, [campaignId], (error, result) => {
    if (error) {
      return callback(error);
    }
    const idlist = result[0].id_list;
    const newidlist = idlist ? `${idlist},${id}` : id.toString();
    const updateSql = `UPDATE campaign SET id_list = ? WHERE idcampaign = ?`;
    pool.query(updateSql, [newidlist, campaignId], (updateError, updateResult) => {
      if (updateError) {
        return callback(updateError);
      }
      return callback(null, updateResult);
    });
  });
}

module.exports = {
    addIdToListIdModel
};