const router = require("express").Router();
const getAllMenu = require("../Controllers/Menu/getAllMenu");
const addMenu = require("../Controllers/Menu/addMenu");

router.get("/", getAllMenu);

router.post("/add", addMenu);


module.exports = router;
