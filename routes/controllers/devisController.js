const devisModel = require('../models/devisModel');

exports.addDevis = function(req, res) {
  const deliverable = req.body.deliverable;
  const nb_deliverable = req.body.nb_deliverable;
  const price = req.body.price;
  const devEd = req.body.devEd;
  const devCampaign = req.body.devCampaign;

  devisModel.addDevis(deliverable, nb_deliverable, price, devEd, devCampaign)
    .then((devisId) => {
      res.status(200).send(`Devis added with ID: ${devisId}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};