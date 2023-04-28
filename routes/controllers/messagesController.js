const addMessage = require('../models/messagesModel');

exports.addMessage = function(req, res) {
  const message = req.body.message;
  const senderId = req.body.sender;
  const receiverId = req.body.receiver;

  addMessage.addMessage(message, senderId, receiverId)
    .then((messageId) => {
      res.status(200).send(`Message added with ID: ${messageId}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
