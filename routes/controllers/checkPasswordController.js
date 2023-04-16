const cheackPasswordModel = require('../models/CheckPasswordModel');

const password = (req, res) => {
  const id = req.params.id;
  const { password } = req.body;

  cheackPasswordModel.getUserByIdAndPassword(id, password, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        res.send({ message: "correct password " });
      } else {
        res.send({ message: "Wrong password" });
      }
    }
  });
};

module.exports = {
    password
};