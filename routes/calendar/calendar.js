const router = require("express").Router();
const Calendar = require("./calendar.model");

//get all
router.get("/", async (req, res) => {
 try {
  const calendar = await Calendar.find();
  res.json(calendar);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
});

//remove all calendar items for user
// router.delete("/:user/all", async (req, res) => {
//  try {
//   const deleted = await Calendar.deleteMany({
//    userId: req.params.user,
//   });
//   res.json(deleted);
//  } catch (err) {
//   res.status(500).json("Error: " + err);
//  }
// });

//remove calendar items for a peticular day
// router.delete("/:user/:date", async (req, res) => {
//  try {
//   const deleted = await Calendar.deleteMany({
//    userId: req.params.user,
//    dateAdded: req.params.date,
//   });
//   res.json(deleted);
//  } catch (err) {
//   res.status(500).json("Error: " + err);
//  }
// });

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

// router.post("/update", async (req, res) => {
//  try {
//   const { menuItems, user, date } = req.body;

//   const calendarItem = await Calendar.findOne({
//    userId: user,
//    date: date,
//   });
//   const updatedCalendarItem = (calendarItem.menuItems = [...menuItems]);
//   res.status(201).json(updatedCalendarItem);
//  } catch (err) {
//   res.status(400).json("Error: " + err);
//  }
// });

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
