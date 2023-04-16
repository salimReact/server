const user = require('../models/profileModel');

const getUserById = (req, res) => {
  const id = req.params.id;
  user.getUserById(id, (err, result) => {
    if (err) {
      res.send({ err: err });     
    } else {
      if (result) {
        res.send({ data: result });
      } else {
        res.send({ message: "No data found" });
      }
    }
  });
};

module.exports = { getUserById };