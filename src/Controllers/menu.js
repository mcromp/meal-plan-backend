const menuData = require("../Routes/Menu/menu.json");

exports.getAll = async (req, res) => {
 try {
  res.json(menuData);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
};

exports.getOne = async (req, res) => {
 try {
  const id = req.params.id;
  const menuItem = menuData.find((menuItem) => menuItem.ID === id);
  if (menuItem) {
   res.json(menuItem);
  }
 } catch (err) {
  res.status(400).json("Error: " + err);
 }
};
