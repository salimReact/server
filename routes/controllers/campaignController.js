const { addCampaign } = require('../models/campaignModel');

function addCampaignController(req, res) {
  const campaignData = req.body;
  addCampaign(campaignData, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.send(result);
  });
}

module.exports = {
  addCampaignController
};
