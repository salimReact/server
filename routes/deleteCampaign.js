const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

const deleteCampaign = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM campaign WHERE idcampaign = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Unable to delete campaign', error });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'campaign not found' });
    }

    return res.json({ message: 'campaign deleted successfully' });
  });
};

module.exports = deleteCampaign;
