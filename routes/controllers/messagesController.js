const messagesModel = require('../models/messagesModel');

exports.addMessage = function(req, res) {
  const message = req.body.message;
  const id_sender = req.body.id_sender;
  const id_receiver = req.body.id_receiver;

  messagesModel.addMessage(message, id_sender, id_receiver)
    .then((messageId) => {
      res.status(200).send(`Message added with ID: ${messageId}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};