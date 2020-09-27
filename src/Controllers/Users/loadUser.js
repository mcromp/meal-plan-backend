const UserModel = require("../../Models/user.model");

module.exports = async (req, res, next) => {
 try {
  res.user = await UserModel.findById(req.body.userId).exec();
 } catch (e) {
  return res.status(500).json(`${e}`);
 }
 next();
};
