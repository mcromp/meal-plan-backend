const Menu = require("../../Models/menu.model")

module.exports = async (req, res) => {
 try {
  const deletedMenu = await Menu.findByIdAndDelete(req.body.id);
  if (!deletedMenu) { return response.status(400).json({ error: 'Menu Item not found' })}
  res.status(201).json(deletedMenu);
 } catch (e) {
  res.status(500).json(e.message);
 }
};
