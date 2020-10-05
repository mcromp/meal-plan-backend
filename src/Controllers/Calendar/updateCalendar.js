const Calendar = require("../../Models/calendar.model");
const checkMenuItemId = require("../HelperFunction/checkMenuItemId");
const checkCalendarDuplicates = require("../HelperFunction/checkCalendarDuplicates");
module.exports = async (req, res) => {
 try {
  const { menuItems, userId, date } = req.body;
  menuItems.forEach((item) => checkMenuItemId(item.foodId));
  const calendarItem = await Calendar.findOneAndUpdate(
   { date, userId },
   { menuItems: menuItems },
   { new: true, upsert: true }
  );
  if (!calendarItem) throw new Error("Date not found");
  res.status(201).json(calendarItem);
 } catch (e) {
  res.status(400).json(`${e}`);
 }
};
