const dataModel = require('../models/dataModel');
const dataView = require('../views/dataView');

exports.getData = (req, res) => {
    dataModel.getData((err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    dataView.renderData(res, data);
  });
};

