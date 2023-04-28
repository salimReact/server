const { updateDevisStatus } = require('../models/updateDevisStatusModel');

const updateDevisStatusController = (req, res) => {
    const idDevis = req.params.id;
    const { status } = req.body;

    updateDevisStatus(idDevis, status, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Devis status updated successfully' });
    }
  });
};

module.exports = {
    updateDevisStatusController,
};
