const Calendar = require("../../Models/calendar.model");

module.exports = async (req, res) => {
 try {
  const calendar = await Calendar.find();
  res.status(200).json(calendar);
 } catch (e) {
  res.status(400).json(e.message);
 }
};
