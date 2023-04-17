const userModel = require('../models/updateUserModel');

function updateUser(req, res) {
  const id = req.params.id;
  const data = req.body;

  userModel.updateUser(id, data, (err, result) => {
    if (err) {
      res.status(500).send('Error updating data');
    } else {
      res.send(result);
    }
  });
}

module.exports = {
  updateUser,
};
