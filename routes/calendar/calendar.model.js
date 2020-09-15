const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  foodItemId: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;
