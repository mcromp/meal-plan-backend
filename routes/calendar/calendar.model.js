const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  foodItemId: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
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
});

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;
