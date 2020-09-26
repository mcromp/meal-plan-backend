const Calendar = require("../../Models/calendar.model");

module.exports = async (req, res, next) => {
 try {
  const userCalendarItems = await Calendar.find({
   userId: req.body.userId,
  }).exec();
  const userDateList = userCalendarItems.reduce((acc, item) => {
   acc.push(item.date);
   return acc;
  }, []);
  const filteredDates = req.body.dateList.filter(
   (reqDate) => !userDateList.includes(reqDate)
  );
  req.filteredDates = filteredDates;
  next();
 } catch (err) {
  res.status(400).json({ err });
 }
};
