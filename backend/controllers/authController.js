const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await user.matchPassword(password)) {
    res.json({ token: generateToken(user._id), role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
