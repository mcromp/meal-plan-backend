const router = require("express").Router();
const menu = require("../Controllers/menu");

router.get("/", menu.getAll);

router.get("/:id", menu.getOne);

module.exports = router;
