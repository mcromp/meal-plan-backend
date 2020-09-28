const Calendar = require("../../Models/calendar.model");

module.exports = async (req, res) => {
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
  console.log(newCalendarList);
  await Calendar.insertMany(newCalendarList, { ordered: false });
  res.status(201).json(newCalendarList);
 } catch (e) {
  res.status(400).json(`${e}`);
 }
};
