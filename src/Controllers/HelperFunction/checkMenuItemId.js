const menuData = require("../../Assets/menu.json");

const ID_LIST = menuData.reduce((acc, item) => {
 acc.push(item.ID);
 return acc;
}, []);

module.exports = (itemId) => {
 if (typeof itemId !== "string")
  throw new Error("Menu Item Id must be a string");
 if (!ID_LIST.includes(itemId))
  throw new Error("Submitted item(s) not in Menu List");
};
