const Calendar = require("../../Models/calendar.model");

module.exports = async (req, res, next) => {
 try {
  const dateList = [...req.filteredDates];
  const newCalendarList = dateList.reduce((acc, date) => {
   const calendar = new Calendar({
    date,
    userId: req.body.userId,
    menuItem: [],
   });
   acc.push(calendar);
   return acc;
  }, []);
  await Calendar.save(newCalendarList).exec();
  next();
 } catch (e) {
  res.status(400).json(`${e}`);
 }
};
