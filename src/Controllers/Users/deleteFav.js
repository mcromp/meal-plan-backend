const checkMenuItemId = require("../HelperFunction/checkMenuItemId");

module.exports = async (req, res) => {
 const itemId = req.body.itemId;
 const favList = res.user.favList;
 const index = favList.indexOf(itemId);
 try {
  checkMenuItemId(itemId);
  if (index === -1) {
   return res.status(400).json("Cannot remove, id not found");
  }
  res.user.favList.splice(index, 1);
  const updatedUser = await res.user.save();
  res.status(201).json(updatedUser);
 } catch (err) {
  res.status(400).json("" + err);
 }
};
