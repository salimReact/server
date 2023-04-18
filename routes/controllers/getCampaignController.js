const getCampaignModel = require('../models/getCampaignModel');

async function getCampaignController(req, res) {
  try {
    const campaignData = await getCampaignModel();
    res.json(campaignData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getCampaignController;
