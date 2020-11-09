const Calendar = require('../../Models/calendar.model');

module.exports = async (req, res) => {
  try {
    const calendar = await Calendar.find();
    res.status(201).json(calendar);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
