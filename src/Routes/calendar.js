const router = require("express").Router();
const getAllCalendar = require("../Controllers/Calendar/getAllCalendar");
const deleteUsersCalendar = require("../Controllers/Calendar/deleteUsersCalendar");
const getUsersCalendar = require("../Controllers/Calendar/getUsersCalendar");
const addDate = require("../Controllers/Calendar/addDate");
const filterCalendarDates = require("../Controllers/Calendar/filterCalendarDates");
const updateCalendar = require("../Controllers/Calendar/updateCalendar");

router.get("/", getAllCalendar);

router.get("/:userId/", getUsersCalendar);

router.delete("/user", deleteUsersCalendar);

router.post("/update", updateCalendar);

router.post("/add", filterCalendarDates, addDate);

module.exports = router;
