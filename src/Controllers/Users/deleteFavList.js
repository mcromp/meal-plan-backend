module.exports = async (req, res) => {
 try {
  res.user.favList = [];
  const userWithUpdatedFavList = await res.user.save();
  res.json(userWithUpdatedFavList);
 } catch (e) {
  res.status(400).json(e.message);
 }
};
