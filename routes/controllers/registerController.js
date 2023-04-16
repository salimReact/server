const { createUser } = require('../models/registerModel');

const registerUser = (req, res) => {
  const { Fname, username, email, phone, password, gender, community_type, role ,companyName, companyType, companyPhone, companyEmail, companyDomaine } = req.body;
  const imagePath = req.file.filename; 

  createUser({
    Fname,
    username,
    email,
    phone,
    password,
    gender,
    community_type,
    role,
    companyName,
    companyType,
    companyPhone,
    companyEmail,
    companyDomaine,
    imagePath
  }, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error registering user" });
    } else {
      res.status(200).json({ message: result });
    }
  });
}

module.exports = {
  registerUser
}
