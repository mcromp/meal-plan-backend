const router = require("express").Router();
const Calendar = require("../../Models/calendar.model");
const calendar = require("../Controllers/calendar");

router.get("/", calendar.getAll);

router.get("/:userId/", calendar.getUser);

router.delete("/user", calendar.deleteUserCalender);

router.post("/update", calendar.updateCalendar);

router.post("/add", calendar.filterCalendarDates, calendar.addDate);

module.exports = router;
