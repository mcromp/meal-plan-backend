const Calendar = require("../../Models/calendar.model");

module.exports = async (req, res) => {
 try {
  const calendar = await Calendar.find();
  console.log(calendar);
  res.status(201).json(calendar);
 } catch (err) {
  res.status(500).json({ err });
 }
};
