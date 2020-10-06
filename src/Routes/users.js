const router = require("express").Router();

const getAllUsers = require("../Controllers/Users/getAllUsers");
const addUser = require("../Controllers/Users/addUser");
const addFav = require("../Controllers/Users/addFav");
const deleteFav = require("../Controllers/Users/deleteFav");
const deleteUser = require("../Controllers/Users/deleteUser");
const loadUser = require("../Controllers/Users/loadUser");
const deleteFavList = require("../Controllers/Users/deleteFavList");
const getOneUser = require("../Controllers/Users/getOneUser");

router.get("/", getAllUsers);

router.get("/:id", getOneUser);

router.delete("/", deleteUser);

router.post("/signup", addUser);

router.post("/favRemove", loadUser, deleteFav);

router.post("/favAdd", loadUser, addFav);

router.post("/favClear", loadUser, deleteFavList);

module.exports = router;
