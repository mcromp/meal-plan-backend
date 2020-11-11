const Calendar = require("../../Models/calendar.model");
module.exports = async (req, res) => {
 try {
  const { menuItems, userId, date } = req.body;
  const filter = { date: date, userId: userId };
  const calendarItem = await Calendar.findOneAndUpdate(
   filter,
   { menuItems: menuItems },
   { new: true, upsert: true }
  );
  if (!calendarItem.date) {
   return res.status(400).json({ error: "Date not found" });
  }
  res.status(200).json(calendarItem);
 } catch (e) {
  res.status(400).json(e.message);
 }
};
