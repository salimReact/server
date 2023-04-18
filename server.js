const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const dataController = require('./routes/controllers/dataController');
const loginController = require('./routes/controllers/loginController');
const registerController = require('./routes/controllers/registerController');
const profileController = require('./routes/controllers/profileController');
const updateUserController = require('./routes/controllers/updateUserController');
const updateUserPasswordController = require('./routes/controllers/updateUserPasswordController');
const checkPasswordController = require('./routes/controllers/checkPasswordController');
const addCampaignController = require('./routes/controllers/campaignController');
const getCampaignController = require('./routes/controllers/getCampaignController');
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
app.use('/updateUser/:id', updateUserController.updateUser);
app.use('/updateUserPassword/:id', updateUserPasswordController.updatePassword);
app.use('/checkPassword/:id', checkPasswordController.password);
app.use('/addCampaign', addCampaignController.addCampaignController);
app.get('/campaignData', getCampaignController);


app.use('/images', express.static('Images'));
app.listen(3000, ()=>   console.log('Server listening on port 3000')
)