const Menu = require("../../Models/menu.model")
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
 const menuAdd = new Menu({
  item: req.body.item,
  category: req.body.filter,
  id: uuidv4(),
 });
 try {
  const menuSaved = await menuAdd.save();
  res.status(201).json(menuSaved);
 } catch (e) {
  let message = e.message;
  if (e.message.includes("duplicate key error")) {
   message = "Error: Menu item already exsist";
  }
  res.status(400).json(message);
 }
};
