const router = require("express").Router();
const UserModel = require("./user.model");

router.route("/").get((req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//add new user
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const favList = [];
  const newUser = new User({
    username,
    favList,
  });
  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json(err));
});
//delete User
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
