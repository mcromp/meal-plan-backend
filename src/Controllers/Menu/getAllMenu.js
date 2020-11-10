const Menu = require("../../Models/menu.model");

module.exports = async (req, res) => {
 try {
  const menu = await Menu.find();
  res.status(200).json(menu);
 } catch (e) {
  res.status(500).json(e.message);
 }
};
