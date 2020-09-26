const router = require("express").Router();
let menu = require("./menu.json");

router.get("/", async (req, res) => {
 try {
  res.json(menu);
 } catch (err) {
  res.status(500).json("Error: " + err);
 }
});

router.get("/:id", (req, res) => {
 try {
  const id = req.params.id;
  const menuItem = menu.find((menuItem) => menuItem.ID === id);
  if (menuItem) {
   res.json(menuItem);
  }
 } catch (err) {
  res.status(400).json("Error: " + err);
 }
});

module.exports = router;
