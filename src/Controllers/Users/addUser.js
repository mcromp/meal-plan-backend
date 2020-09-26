const UserModel = require("../../Models/user.model");

module.exports = async (req, res) => {
 const user = new UserModel({
  username: req.body.username,
  favList: [],
 });
 try {
  const newUser = await user.save();
  res.status(201).json(newUser);
 } catch (err) {
  res.status(400).json(err);
 }
};
