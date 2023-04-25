const { addIdToListIdModel } = require('../models/addIdToListIdModel');

function addIdToListIdConstroller(req, res) {
  const campaignId = req.params.id; 
  const id = req.body.ed; 
  addIdToListIdModel(campaignId, id, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error adding ID to campaign');
    }
    return res.send('ID added to campaign successfully');
  });
}

module.exports = {
    addIdToListIdConstroller
};