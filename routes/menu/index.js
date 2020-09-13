const router = require("express").Router();
let menu = require("./menu.json");

router.route("/").get((req, res) => {
  res.json(menu);
});

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  const menuItem = menu.find((menuItem) => menuItem.ID === id);
  if (menuItem) {
    res.json(menuItem);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
