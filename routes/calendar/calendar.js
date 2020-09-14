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

//add to calendar, several items
router.post("/add", async (req, res) => {
  const { data } = req.body;
  const { foodItemId, dateAdded, quantity, userId } = req.body;
  const stringToDate = new Date(dateAdded);
  const calendar = new Calendar({
    foodItemId,
    dateAdded: stringToDate,
    quantity,
    userId,
  });
  try {
    const newCalenderItem = await calendar.save();
    res.status(201).json(newCalenderItem);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//Update calendar, several items

module.exports = router;
