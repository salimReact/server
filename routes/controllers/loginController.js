const express = require('express');
const router = express.Router();
const Login = require('../models/loginModel');

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userId = await Login.getByEmailAndPassword(email, password);
    res.send({ message: "Login successful", userId: userId });
  } catch (err) {
    res.send({ message: err.message });
  }
});

module.exports = router;