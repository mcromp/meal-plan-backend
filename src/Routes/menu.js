const router = require("express").Router();
const getAllMenu = require("../Controllers/Menu/getAllMenu");

router.get("/", getAllMenu);

module.exports = router;
