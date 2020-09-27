const Calendar = require("../../Models/calendar.model");
const checkMenuItemId = require("../HelperFunction/checkMenuItemId");
const checkCalendarDuplicates = require("../HelperFunction/checkCalendarDuplicates");
module.exports = async (req, res) => {
 try {
  const { menuItems, userId, date } = req.body;
  checkCalendarDuplicates(menuItems);
  menuItems.forEach((item) => checkMenuItemId(item.foodId));
  const calendarItem = await Calendar.findOne({ userId, date }).exec();
  calendarItem.menuItems = [...menuItems];
  const savedCalendarItem = await calendarItem.save();
  res.status(201).json(savedCalendarItem);
 } catch (e) {
  res.status(400).json(`${e}`);
 }
};
