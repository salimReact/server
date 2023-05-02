const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

const deleteContract = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM contract WHERE cont_id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Unable to delete contract', error });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'contract not found' });
    }

    return res.json({ message: 'contract deleted successfully' });
  });
};

module.exports = deleteContract;
