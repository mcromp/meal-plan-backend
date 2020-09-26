const Calendar = require("../Models/calendar.model");

exports.getAll = async (req, res) => {
 try {
  const calendar = await Calendar.find();
  res.status(201).json(calendar);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
};

exports.getUser = async (req, res) => {
 try {
  const calendar = await Calendar.find({ userId: req.query.userId });
  res.status(201).json(calendar);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
};

exports.deleteUserCalender = async (req, res, next) => {
 try {
  const deleted = await Calendar.deleteMany({ userId: req.body.id }).exec();
  res.status(201).json(deleted);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
 next();
};

exports.updateCalendar = async (req, res) => {
 try {
  const { menuItems, userId, date } = req.body;
  const calendarItem = await Calendar.findOne({ userId, date }).exec();
  calendarItem.menuItems = [...menuItems];
  const savedCalendarItem = await calendarItem.save();
  res.status(201).json(savedCalendarItem);
 } catch (err) {
  res.status(400).json("Error: " + err);
 }
};

exports.filterCalendarDates = async (req, res, next) => {
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
  res.status(400).json("Error: " + err);
 }
};

exports.addDate = async (req, res) => {
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

  await Calendar.insertMany(newCalendarList);
  res.status(201).json(newCalendarList);
 } catch (err) {
  res.status(400).json("Error: " + err);
 }
};
