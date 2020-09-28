const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
 foodId: String,
 quantity: Number,
});

const calendarSchema = new Schema({
 userId: {
  type: String,
  required: true,
 },
 date: {
  type: String,
  required: true,
 },
 menuItems: [foodItemSchema],
});

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;
