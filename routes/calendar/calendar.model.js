const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
 foodId: {
  type: String,
  required: true,
 },
 quantity: {
  type: Number,
  required: true,
 },
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
