const router = require("express").Router();
const userZ = require("../Controllers/users");

router.get("/", userZ.getAll);

router.delete("/", userZ.deleteUser);

router.post("/signup", userZ.signUp);

router.post("/favRemove", userZ.removefav);

router.post("/favAdd", userZ.getUser, userZ.addFav);

router.post("/:id/favListClear", userZ.getUser, userZ.clearFav);

module.exports = router;
