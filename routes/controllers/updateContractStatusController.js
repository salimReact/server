const { updateContractStatus } = require('../models/updateContractStatusModel');

const updateContractStatusController = (req, res) => {
    const cont_id = req.params.id;
    const { status } = req.body;

  updateContractStatus(cont_id, status, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json({ message: 'Contract status updated successfully' });
    }
  });
};

module.exports = {
  updateContractStatusController,
};
