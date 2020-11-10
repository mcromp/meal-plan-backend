module.exports = async (req, res) => {
 const itemId = req.body.itemId;
 const favList = res.user.favList;
 const index = favList.indexOf(itemId);
 try {
  if (index === -1) {
   return res.status(400).json({ error: "Cannot remove, item not found" });
  }
  res.user.favList.splice(index, 1);
  const updatedUser = await res.user.save();
  res.status(200).json(updatedUser);
 } catch (e) {
  res.status(400).json(e.message);
 }
};
