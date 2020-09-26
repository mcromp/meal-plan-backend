const Calendar = require("../../Models/calendar.model");

module.exports = async (req, res) => {
 try {
  const { menuItems, userId, date } = req.body;
  const calendarItem = await Calendar.findOne({ userId, date }).exec();
  calendarItem.menuItems = [...menuItems];
  const savedCalendarItem = await calendarItem.save();
  res.status(201).json(savedCalendarItem);
 } catch (err) {
  res.status(400).json({ err });
 }
};
