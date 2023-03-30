const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');


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

  app.get('/', (req, res) => {
res.send('sello');
  })
app.get('/data', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database: ', err);
        res.status(500).send('Internal server error');
        return;
      }
  
      connection.query('SELECT * FROM editors', (err, rows) => {
        connection.release(); // release the connection back to the pool
        if (err) {
          console.error('Error executing query: ', err);
          res.status(500).send('Internal server error');
          return;
        }
  
        // Send the retrieved data as JSON
        res.json(rows);
      });
    });
  });
  app.post("/register",(req,res)=>{

    const { Fname, username, email, phone, password, gender,hobbies,image } = req.body;
    res.status(200).json({ message: "User registered successfully" });


    pool.query("INSERT INTO editors (full_name, username, email, phone_number, password,gender,hobbies,image) VALUES (?,?, ?, ?, ?, ?, ?, ?)",
    [Fname,username,email,phone,password,gender,JSON.stringify(hobbies),image],
    (err,result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error registering user" });
      } else {
        res.status(200).json({ message: "User registered successfully" });
      }
    }
    );
  });
  app.post("/registerAnnoncer",(req,res)=>{

    const { Fname, email, phone, password, gender,companyName,companyEmail,companyPhone,companyDomaine,companyType } = req.body;


    pool.query("INSERT INTO annoncers (full_name, email, phone, password,gender,companyName,companyEmail,companyPhone,companyDomaine,companyType) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [Fname,email,phone,password,gender,companyName,companyEmail,companyPhone,companyDomaine,companyType],
    (err,result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error registering user" });
      } else {
        res.status(200).json({ message: "User registered successfully" });
      }
    }
    );
  });
  app.post("/login",(req,res)=>{
     const { email, password } = req.body;
  
    pool.query("SELECT * FROM editors WHERE email = ? AND password = ?",
      [email, password],
      (err, result) => {
        if (err) {
          res.send({ err: err });     
        } else {
          if (result.length > 0) {
            res.send({ message: "Login successful" });
          } else {
            res.send({ message: "Wrong email or password" });
          }
        }
        
      }
    );
  });
app.listen(3000, ()=>   console.log('Server listening on port 3000')
)