const offersModel = require('../models/getOffersModel');

exports.getOfferByEdId = async (req, res, next) => {
  try {
    const edId = req.params.id; 
    const offer = await offersModel.getOfferByEdId(edId);
    res.status(200).json({ success: true, data: offer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};