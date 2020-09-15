const router = require("express").Router();
const Calendar = require("./calendar.model");
const { v4: uuidv4 } = require("uuid");

//middleware
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await UserModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json("Error: " + err);
    }
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }
  res.user = user;
  next();
};

//get all
router.get("/", async (req, res) => {
  try {
    const calendar = await Calendar.find();
    res.json(calendar);
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});

//thing to do - make a middleware to go through data

//clear calendar items for a peticular day
//clear all

//add to calendar, several items
router.post("/add", async (req, res) => {
  try {
    const dataList = [...req.body];
    console.log(req.body);
    const calendarList = dataList.reduce((acc, item) => {
      const { foodItemId, dateAdded, quantity, userId } = item;
      const id = uuidv4();
      const stringToDate = new Date(dateAdded);
      const calendar = new Calendar({
        foodItemId,
        dateAdded: stringToDate,
        quantity,
        userId,
        id,
      });
      acc.push(calendar);
      return acc;
    }, []);

    await Calendar.insertMany(calendarList);
    res.status(201).json(calendarList);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
