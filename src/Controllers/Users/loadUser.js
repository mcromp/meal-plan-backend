const UserModel = require("../../Models/user.model");

module.exports = async (req, res, next) => {
 try {
  res.user = await UserModel.findById(req.body.userId).exec();
  if (!res.user) throw Error("User not found");
 } catch (e) {
  return res.status(500).json(e.message);
 }
 next();
};
