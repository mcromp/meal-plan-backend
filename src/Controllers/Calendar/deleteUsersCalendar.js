const Calendar = require("../../Models/calendar.model");

module.exports = async (req, res, next) => {
 try {
  const deleted = await Calendar.deleteMany({ userId: req.body.id }).exec();
  res.status(201).json(deleted);
 } catch (err) {
  res.status(500).json({ err });
 }
 next();
};
