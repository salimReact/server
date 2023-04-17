const userModel = require('../models/updateUserPasswordModel');

function updatePassword(req, res) {
  const id = req.params.id;
  const newPassword = req.body.newpassword;

  userModel.updatePassword(id, newPassword, (err, result) => {
    if (err) {
      res.status(500).send('Error updating data');
    } else {
      res.send(result);
    }
  });
}

module.exports = {
  updatePassword,
};
