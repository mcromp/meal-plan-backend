const Calendar = require("../../Models/calendar.model");
module.exports = async (req, res) => {
 try {
  const { menuItems, userId, date } = req.body;
  const calendarItem = await Calendar.findOneAndUpdate(
   { date, userId },
   { menuItems: menuItems },
   { new: true, upsert: true }
  );
  if (!calendarItem) { return response.status(400).json({ error: 'Date not found' }) }
  res.status(201).json(calendarItem);
 } catch (e) {
  res.status(400).json(e.message);
 }
};
