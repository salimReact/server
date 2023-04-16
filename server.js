const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataController = require('./routes/controllers/dataController');
const loginController = require('./routes/controllers/loginController');
const registerController = require('./routes/controllers/registerController');
const profileController = require('./routes/controllers/profileController');
const updateUserRoute = require('./routes/updateUser');
const updateUserPasswordRoute = require('./routes/updateUserPassword');
const checkPasswordController = require('./routes/controllers/checkPasswordController');
const path = require('path');
const uploadImage = require('./routes/middleware/uploadImage');



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


app.use('/data', dataController.getData);
app.use('/profile/:id', profileController.getUserById);
app.use('/register', uploadImage.single('image') , registerController.registerUser);
app.use('/login', loginController);
app.use('/updateUser', updateUserRoute);
app.use('/updateUserPassword', updateUserPasswordRoute);
app.use('/checkPassword/:id', checkPasswordController.password);



app.use('/images', express.static('Images'));
app.listen(3000, ()=>   console.log('Server listening on port 3000')
)