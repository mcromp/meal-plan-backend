const Calendar = require("../../Models/calendar.model");
const User = require("../../Models/user.model");

module.exports = async (req, res) => {
 try {
  const users = await User.findById(req.params.userId);
  const calendar = await Calendar.find({
   date: { $in: req.body.dateList },
   userId: req.params.userId,
  });
  if (!users) {
   return res.status(400).json({ error: "User Id not found" });
  }
  res.status(200).json(calendar);
 } catch (e) {
  res.status(400).json(e.message);
 }
};
