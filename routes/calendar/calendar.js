const router = require("express").Router();
const Calendar = require("./calendar.model");

router.route("/").get(async (req, res) => {
  try {
    const calendar = await Calendar.find();
    res.json(calendar);
  } catch (err) {
    res.status(500).json("Error: " + err);
  }
});
