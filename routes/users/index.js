const router = require("express").Router();
const UserModel = require("./user.model");
const menu = require("../menu/menu.json");
const { mapReduce } = require("./user.model");
const ID_LIST = menu.reduce((acc, item) => {
  acc.push(item.ID);
  return acc;
}, []);

//middleware
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await UserModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json("Error: " + err);
    }
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }
  res.user = user;
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

//delete User
router.route("/:id").delete(async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json("User deleted");
  } catch (err) {}
  res.status(500).json("Error: " + err);
});

//add favList
router.patch("/:id/favListAdd", getUser, async (req, res) => {
  const { data } = req.body;
  try {
    data.forEach((id) => {
      if (!ID_LIST.includes(id)) {
        throw new Error(`${id} is not a valid ID`);
      }
    });
    res.user.favList = data;
    const userWithUpdatedFavList = await res.user.save();
    res.json(userWithUpdatedFavList);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
//clear favList
router.patch("/:id/favListClear", getUser, async (req, res) => {
  try {
    res.user.favList = [];
    const userWithUpdatedFavList = await res.user.save();
    res.json(userWithUpdatedFavList);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
module.exports = router;
