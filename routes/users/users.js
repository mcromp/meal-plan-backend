const router = require("express").Router();
const UserModel = require("./user.model");
const menu = require("../menu/menu.json");
const Calendar = require("../calendar/calendar.model");
const ID_LIST = menu.reduce((acc, item) => {
 acc.push(item.ID);
 return acc;
}, []);

//usercheck
const checkUser = async (req, res, next) => {
 try {
  res.user = await UserModel.findById(req.params.id);
 } catch (err) {
  return res.status(500).json("Error: " + err);
 }
 next();
};

//get all
router.route("/").get(async (req, res) => {
 try {
  const users = await UserModel.find();
  res.json(users);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
});
//add user
router.route("/signup").post(async (req, res) => {
 const user = new UserModel({
  username: req.body.username,
  favList: [],
 });
 try {
  const newUser = await user.save();
  res.status(201).json({ newUser });
 } catch (err) {
  res.status(400).json("Error: " + err);
 }
});

//delete user by id
router.delete("/", async (req, res) => {
 try {
  await Calendar.deleteMany({ userId: req.body.id });
  const deletedUser = await UserModel.findByIdAndDelete(req.body.id);
  res.status(201).json({ deletedUser });
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
});

//remove one from favlist
router.patch("/:id/favRemove", checkUser, async (req, res) => {
 const { payload } = req.body;
 const favList = res.user.favList;
 const index = favList.indexOf(payload);
 try {
  if (!ID_LIST.includes(payload)) {
   return res.status(400).json("Error: incorrect id");
  }
  if (index === -1) {
   return res.status(400).json("Error: id not found");
  }
  res.user.favList.splice(index, 1);
  const updatedUser = await res.user.save();
  res.json(updatedUser);
 } catch (err) {
  res.status(400).json("Error: " + err);
 }
});

//add one to favList
router.patch("/:id/favAdd", checkUser, async (req, res) => {
 const { payload } = req.body;
 const favList = res.user.favList;
 try {
  if (!ID_LIST.includes(payload)) {
   return res.status(400).json("Error: incorrect id");
  }
  if (favList.includes(payload)) {
   return res.status(400).json("Error: already added");
  }
  res.user.favList.push(payload);
  const updatedUser = await res.user.save();
  res.json(updatedUser);
 } catch (err) {
  res.status(400).json("Error: " + err);
 }
});

//clear favList
router.patch("/:id/favListClear", checkUser, async (req, res) => {
 try {
  res.user.favList = [];
  const userWithUpdatedFavList = await res.user.save();
  res.json(userWithUpdatedFavList);
 } catch (err) {
  res.status(400).json("Error: " + err);
 }
});
module.exports = router;
