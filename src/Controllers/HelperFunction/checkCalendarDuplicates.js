module.exports = (itemsArr) => {
 const foodIdArr = itemsArr.reduce((acc, item) => {
  acc.push(item.foodId);
  return acc;
 }, []);
 if (
  foodIdArr.some((id) => foodIdArr.indexOf(id) !== foodIdArr.lastIndexOf(id))
 ) {
  throw new Error("Duplicate foodIds submitted");
 }
};
