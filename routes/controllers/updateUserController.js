const userModel = require('../models/updateUserModel');

function updateUser(req, res) {
  const id = req.params.id;
  const data = req.body;
  const role = req.query.role;
  userModel.updateUser(id, data, role, (err, result) => {
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
