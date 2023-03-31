const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataRoute = require('./routes/data');
const registerAnnoncerRoute = require('./routes/registerAnnoncer');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
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
app.use('/register', registerRoute);
app.use('/registerAnnoncer', registerAnnoncerRoute);
app.use('/login', loginRoute);

app.listen(3000, ()=>   console.log('Server listening on port 3000')
)