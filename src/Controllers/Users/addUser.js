const UserModel = require("../../Models/user.model");

module.exports = async (req, res) => {
 const user = new UserModel({
  username: req.body.username,
  favList: [],
 });
 try {
  const newUser = await user.save();
  res.status(200).json(newUser);
 } catch (e) {
  let message = e.message;
  if (e.message.includes("duplicate key error")) {
   message = "Error: Username already exsist";
  }
  res.status(400).json(message);
 }
};
