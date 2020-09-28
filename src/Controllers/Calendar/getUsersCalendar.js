const Calendar = require("../../Models/calendar.model");

module.exports = async (req, res) => {
 try {
  console.log(req.query);
  const calendar = await Calendar.find({ userId: req.params.userId });
  res.status(201).json(calendar);
 } catch (e) {
  res.status(500).json(`${e}`);
 }
};
