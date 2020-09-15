const router = require("express").Router();
const Calendar = require("./calendar.model");
const { v4: uuidv4 } = require("uuid");

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
router.delete("/:user/all", async (req, res) => {
  try {
    const deleted = await Calendar.deleteMany({
      userId: req.params.user,
    });
    res.json(deleted);
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});

//remove calendar items for a peticular day
router.delete("/:user/:date", async (req, res) => {
  try {
    const deleted = await Calendar.deleteMany({
      userId: req.params.user,
      dateAdded: req.params.date,
    });
    res.json(deleted);
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});

//add to calendar, several items
router.post("/add", async (req, res) => {
  try {
    const dataList = [...req.body];
    console.log(req.body);
    const calendarList = dataList.reduce((acc, item) => {
      const { foodItemId, dateAdded, quantity, userId } = item;
      const id = uuidv4();
      const calendar = new Calendar({
        foodItemId,
        dateAdded,
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
