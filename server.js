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
const {updateContractStatusController} = require('./routes/controllers/updateContractStatusController');
const updateUserPasswordController = require('./routes/controllers/updateUserPasswordController');
const checkPasswordController = require('./routes/controllers/checkPasswordController');
const addCampaignController = require('./routes/controllers/campaignController');
const getCampaignController = require('./routes/controllers/getCampaignController');
const offersController = require('./routes/controllers/getOffersController');
const addIdToCampaignController = require('./routes/controllers/addIdToCampaignController');
const addIdToListIdConstroller = require('./routes/controllers/addIdToListIdConstroller');
const devisController = require('./routes/controllers/devisController');
const messagesController = require('./routes/controllers/messagesController');
const contractController = require('./routes/controllers/contractController');
const { getDevisController } = require('./routes/controllers/getDevisController');
const { getMessageController } = require('./routes/controllers/getMessagesController');
const { getContractController } = require('./routes/controllers/getContractController');
const {updateDevisStatusController} = require('./routes/controllers/updateDevisStatusController');
const deleteUser = require('./routes/DeleteUser');
const deleteCampaign = require('./routes/deleteCampaign');
const deleteContract = require('./routes/deleteContract');



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
app.use('/updateContractStatus/:id', updateContractStatusController);
app.use('/updateDevisStatus/:id', updateDevisStatusController);
app.use('/updateUserPassword/:id', updateUserPasswordController.updatePassword);
app.use('/checkPassword/:id', checkPasswordController.password);
app.use('/addCampaign', addCampaignController.addCampaignController);
app.get('/campaignData', getCampaignController);
app.use('/getOfferByEdId/:id', offersController.getOfferByEdId);
app.use('/addIdToCampaign/:id', addIdToCampaignController.addIdToCampaignController);
app.use('/addIdToListId/:id', addIdToListIdConstroller.addIdToListIdConstroller);
app.use('/addDevis', devisController.addDevis);
app.use('/getDevis', getDevisController);
app.use('/getMessage', getMessageController);
app.use('/getContract', getContractController);
app.use('/addMessage', messagesController.addMessage);
app.use('/Contract', contractController.addContract);
app.delete('/deleteUser/:id', deleteUser);
app.delete('/deleteCampaign/:id', deleteCampaign);
app.delete('/deleteContract/:id', deleteContract);






app.use('/images', express.static('Images'));
app.listen(3000, ()=>   console.log('Server listening on port 3000')
)