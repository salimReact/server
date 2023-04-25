const { getMessageModel } = require('../models/getMessagesModel');

async function getMessageController(req, res) {
  try {
    const message = await getMessageModel();
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getMessageController };
