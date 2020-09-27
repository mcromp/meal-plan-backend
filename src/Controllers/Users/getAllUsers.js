const UserModel = require("../../Models/user.model");

module.exports = async (req, res) => {
 try {
  const users = await UserModel.find();
  res.status(201).json(users);
 } catch (e) {
  res.status(500).json(`${e}`);
 }
};
