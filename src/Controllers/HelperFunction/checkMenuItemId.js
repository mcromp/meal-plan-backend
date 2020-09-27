const menuData = require("../../Assets/menu.json");

const ID_LIST = menuData.reduce((acc, item) => {
 acc.push(item.ID);
 return acc;
}, []);

module.exports = (itemId) => {
 if (!ID_LIST.includes(itemId))
  throw new Error("Submitted item not in Menu List");
};
