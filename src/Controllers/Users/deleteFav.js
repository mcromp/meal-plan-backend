const checkMenuItemId = require("../HelperFunction/checkMenuItemId");

module.exports = async (req, res) => {
 const itemId = req.body.itemId;
 const favList = res.user.favList;
 const index = favList.indexOf(itemId);
 try {
  checkMenuItemId(itemId);
  if (index === -1) throw Error("Cannot remove, item not found");

  res.user.favList.splice(index, 1);
  const updatedUser = await res.user.save();
  res.status(201).json(updatedUser);
 } catch (e) {
  res.status(400).json(e.message);
 }
};
