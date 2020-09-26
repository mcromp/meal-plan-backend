const UserModel = require("../Models/user.model");
const Calendar = require("../Models/calendar.model");
const menuData = require("../Routes/Menu/menu.json");

const ID_LIST = menuData.reduce((acc, item) => {
 acc.push(item.ID);
 return acc;
}, []);

const checkMenuItemId = (itemId) => {
 if (!ID_LIST.includes(itemId))
  throw new Error("Submitted item not in Menu List");
};

exports.getUser = async (req, res, next) => {
 try {
  res.user = await UserModel.findById(req.body.userId);
 } catch (err) {
  return res.status(500).json(err);
 }
 next();
};

exports.getAll = async (req, res) => {
 try {
  const users = await UserModel.find();
  res.status(201).json(users);
 } catch (err) {
  res.status(500).json(err);
 }
};

exports.signUp = async (req, res) => {
 const user = new UserModel({
  username: req.body.username,
  favList: [],
 });
 try {
  const newUser = await user.save();
  res.status(201).json(newUser);
 } catch (err) {
  res.status(400).json(err);
 }
};

exports.deleteUser = async (req, res) => {
 try {
  await Calendar.deleteMany({ userId: req.body.id });
  const deletedUser = await UserModel.findByIdAndDelete(req.body.id);
  res.status(201).json(deletedUser);
 } catch (err) {
  res.status(500).json("" + err);
 }
};

exports.removefav = async (req, res) => {
 const itemId = req.body.itemId;
 const favList = res.user.favList;
 const index = favList.indexOf(itemId);
 try {
  checkMenuItemId(itemId);
  if (index === -1) {
   return res.status(400).json("Error: Cannot remove, id not found");
  }
  res.user.favList.splice(index, 1);
  const updatedUser = await res.user.save();
  res.status(201).json(updatedUser);
 } catch (err) {
  res.status(400).json("" + err);
 }
};

exports.addFav = async (req, res) => {
 const itemId = req.body.itemId;
 const favList = res.user.favList;
 try {
  checkMenuItemId(itemId);
  if (favList.includes(itemId)) {
   return res.status(400).json("Error: already added");
  }
  res.user.favList.push(itemId);
  const updatedUser = await res.user.save();
  res.status(201).json(updatedUser);
 } catch (err) {
  res.status(400).json("" + err);
 }
};

exports.clearFav = async (req, res) => {
 try {
  res.user.favList = [];
  const userWithUpdatedFavList = await res.user.save();
  res.json(userWithUpdatedFavList);
 } catch (err) {
  res.status(400).json(err);
 }
};
