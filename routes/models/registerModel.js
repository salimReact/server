const mysql = require('mysql2');
const crypto = require('crypto');

// create the connection to database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'sys'
});

const hashPassword = (password) => {
  const salt = 'somerandomstring';
  const hash = crypto.createHmac('sha256', salt)
                   .update(password)
                   .digest('hex');
  return hash;
};

const createUser = (user, callback) => {
  const { Fname, username, email, phone, password, gender, community_type, role ,companyName, companyType, companyPhone, companyEmail, companyDomaine, imagePath } = user;
  const hashedPassword = hashPassword(password);

  pool.query("INSERT INTO users (full_name, email, phone_number, gender, image , password, role) VALUES (?, ?, ?, ?, ? , ?, ?)",
    [Fname, email, phone, gender, imagePath , hashedPassword ,role],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        const user_id = result.insertId;
        if (role === '1') {
          pool.query("INSERT INTO editor_details (user_id, username, community_type) VALUES (?, ?, ?)",
            [user_id, username, JSON.stringify(community_type)],
            (err, result) => {
              if (err) {
                console.log(err);
                callback(err, null);
              } else {
                callback(null, "User registered successfully as editor");
              }
            }
          );
        } else if (role === '2') {
          pool.query("INSERT INTO announcer_details (user_id, companyName, companyType, companyPhone , companyEmail ,companyDomaine) VALUES (?, ?, ?, ? , ? , ?)",
            [user_id, companyName, companyType, companyPhone, companyEmail, companyDomaine],
            (err, result) => {
              if (err) {
                console.log(err);
                callback(err, null);
              } else {
                callback(null, "User registered successfully as announcer");
              }
            }
          );
        } else {
          callback("Invalid role value", null);
        }
      }
    }
  );
}

module.exports = {
  createUser
}