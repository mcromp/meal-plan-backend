const menuData = require("../../Assets/menu.json");

module.exports = async (req, res) => {
 try {
  res.json(menuData);
 } catch (e) {
  res.status(500).json(`${e}`);
 }
};
