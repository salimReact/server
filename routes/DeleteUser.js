const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

const deleteUser = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Unable to delete user', error });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  });
};

module.exports = deleteUser;
