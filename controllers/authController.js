//make an empty login and signup asyc functions
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Endpoint: POST /api/signin
const signIn = async (req, res) => {
  const { username, password } = req.body;
  //check if the username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please provide username and password" });
  }
  //check if the username exists in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "Invalid username" });
  }
  //check if the password is correct
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid password" });
  }
  //generate a web token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  //send the token to the client
  res.status(200).json({ token });
};

// Endpoint: POST /api/signup
const signUp = async (req, res) => {
  const { username, password } = req.body;
  //check if the username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please provide username and password" });
  }
  //check if the username already exists in the database
  if (await User.findOne({ username })) {
    return res.status(400).json({ error: "username already exists" });
  }
  //hash the password
  const hash = await bcrypt.hash(password, 10);
  //create a new user
  const user = new User({
    username,
    password: hash,
  });
  //save the user to the database
  await user.save();
  //generate a web token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  //send the token to the client
  res.status(200).json({ token });
};

module.exports = {
  signIn,
  signUp,
};
