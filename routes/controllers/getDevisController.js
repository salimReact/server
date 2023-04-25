const { getDevisModel } = require('../models/getDevisModel');

async function getDevisController(req, res) {
  try {
    const devis = await getDevisModel();
    res.json(devis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getDevisController };
