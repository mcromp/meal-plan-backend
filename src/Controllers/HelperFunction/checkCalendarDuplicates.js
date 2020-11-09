module.exports = (itemsArr) => {
 const foodIdArr = itemsArr.reduce((acc, item) => {
  acc.push(item.foodId);
  return acc;
 }, []);
 if (
  foodIdArr.some((id) => foodIdArr.indexOf(id) !== foodIdArr.lastIndexOf(id))
 )  response.status(400).json({ error: 'Duplicate foodIds submitted' })
};
