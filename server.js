const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const dataRoute = require('./routes/data');
const registerAnnoncerRoute = require('./routes/registerAnnoncer');
const loginRoute = require('./routes/login');
const path = require('path');




app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create the connection to database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'sys'
  });


app.use('/data', dataRoute);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  },
});

const upload = multer({ storage: storage });

app.post('/register', upload.single('image'), (req, res) => {
  const { Fname, username, email, phone, password, gender, hobbies } = req.body;
  const imagePath = req.file.filename;    

  pool.query("INSERT INTO editors (full_name, username, email, phone_number, password, gender, hobbies, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [Fname, username, email, phone, password, gender, JSON.stringify(hobbies), imagePath],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error registering user" });
      } else {
        console.log(result);
        res.status(200).json({ message: "User registered successfully" });
      }
    }
  );
});

app.use('/registerAnnoncer', registerAnnoncerRoute);
app.use('/login', loginRoute);

  
 
 
app.listen(3000, ()=>   console.log('Server listening on port 3000')
)