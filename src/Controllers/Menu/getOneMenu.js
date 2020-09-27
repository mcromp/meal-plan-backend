const menuData = require("../../Assets/menu.json");

module.exports = async (req, res) => {
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
