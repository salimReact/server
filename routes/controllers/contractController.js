const contractModel = require('../models/contractModel');

exports.addContract = function(req, res) {
  const contract = req.body;

  contractModel.addContract(contract)
    .then((contractId) => {
      res.status(200).send(`Contract added with ID: ${contractId}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};