const router = require("express").Router();
const Calendar = require("./calendar.model");

//get all
router.get("/", async (req, res) => {
 try {
  const calendar = await Calendar.find();
  res.status(201).json(calendar);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
});

// remove all calendar items for user
router.delete("/user", async (req, res) => {
 try {
  const deleted = await Calendar.deleteMany({
   userId: req.body.userId,
  });
  res.status(201).json(deleted);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
});

//get by user
router.get("/:user/", async (req, res) => {
 try {
  const calendar = await Calendar.find({userId: });
  res.json(calendar);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
});

//testing some stuff
// const removeCalendarDates = async (req, res, next) => {
//  const date = req.body[0].dateAdded;
//  try {
//   await Calendar.deleteMany({ dateAdded: `${date}` });
//  } catch (err) {
//   return res.status(500).json("Error: " + err);
//  }
//  next();
// };

router.post("/update", async (req, res) => {
 try {
  const { menuItems, userId, date } = req.body;
  const calendarItem = await Calendar.findOne({ userId, date });
  calendarItem.menuItems = [...menuItems];
  const savedCalendarItem = await calendarItem.save();
  res.status(201).json(savedCalendarItem);
 } catch (err) {
  res.status(400).json("Error: " + err);
 }
});

const filterCalendarDates = async (req, res, next) => {
 try {
  const userCalendarItems = await Calendar.find({ userId: req.body.userId });
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

router.post("/add", filterCalendarDates, async (req, res) => {
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
});

module.exports = router;
