const { getContractModel } = require('../models/getContractModel');

async function getContractController(req, res) {
  try {
    const contract = await getContractModel();
    res.json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getContractController };
