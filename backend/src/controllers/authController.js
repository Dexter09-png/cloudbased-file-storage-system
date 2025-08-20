const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.googleCallback = async (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, { expiresIn: '7d' });
  res.redirect(`${config.frontendUrl}/auth?token=${token}`);
};