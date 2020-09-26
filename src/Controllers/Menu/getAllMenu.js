const menuData = require("../../menu.json");

module.exports = async (req, res) => {
 try {
  res.json(menuData);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
};
