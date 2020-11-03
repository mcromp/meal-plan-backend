const Menu = require("../../Models/menu.model")

module.exports = async (req, res) => {
 try {
  const deletedMenu = await Menu.findByIdAndDelete(req.body.id);
  if (!deletedMenu) throw Error("Menu Item not found");
  res.status(201).json(deletedMenu);
 } catch (e) {
  res.status(500).json(e.message);
 }
};
