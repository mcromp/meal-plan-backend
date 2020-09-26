const router = require("express").Router();
const getAllMenu = require("../Controllers/Menu/getAllMenu");
const getOneMenu = require("../Controllers/Menu/getOneMenu");

router.get("/", getAllMenu);

router.get("/:id", getOneMenu);

module.exports = router;
