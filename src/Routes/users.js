const router = require("express").Router();
const user = require("../Controllers/users");

router.get("/", user.getAll);

router.delete("/", user.deleteUser);

router.post("/signup", user.signUp);

router.post("/favRemove", user.removefav);

router.post("/favAdd", user.getUser, user.addFav);

router.post("/:id/favListClear", user.getUser, user.clearFav);

module.exports = router;
