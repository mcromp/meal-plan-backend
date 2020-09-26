const UserModel = require("../../Models/user.model");
const Calendar = require("../../Models/calendar.model");

module.exports = async (req, res) => {
 try {
  await Calendar.deleteMany({ userId: req.body.id }).exec();
  const deletedUser = await UserModel.findByIdAndDelete(req.body.id);
  res.status(201).json(deletedUser);
 } catch (err) {
  res.status(500).json("" + err);
 }
};
