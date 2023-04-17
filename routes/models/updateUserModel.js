const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

function updateUser(id, data, callback) {
  const { Fname, username, email, phone, aboutme } = data;

  pool.query(
    'UPDATE users u JOIN editor_details e ON u.id = e.user_id SET u.full_name = ?,  u.email = ?,  u.phone_number = ?,  u.aboutMe = ?,  e.username = ? WHERE u.id = ?',
    [Fname, email, phone, aboutme, username, id],
    (err, result) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        console.log(result.affectedRows + ' record(s) updated');
        callback(null, 'Data updated successfully');
      }
    }
  );
}

module.exports = {
  updateUser,
};
