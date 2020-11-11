const initalMenu = [
 {
  item: "Cereal",
  category: "BREAKFAST",
  id: "0",
 },
 {
  item: "Hashbrowns",
  category: "BREAKFAST",
  id: "1",
 },
 {
  item: "Sausage",
  category: "BREAKFAST",
  id: "2",
 },
];

const initalUsers = [
 {
  favList: ["0", "1"],
  _id: "5fa2efc54b2279a838761186",
  username: "Albert",
  createdAt: "2020-11-04T18:15:33.657Z",
  updatedAt: "2020-11-09T09:44:30.497Z",
  __v: 20,
 },
 {
  favList: ["26", "27"],
  _id: "5fa53b5ec9feffe63281be5e",
  username: "Harry",
  createdAt: "2020-11-06T12:02:38.192Z",
  updatedAt: "2020-11-09T08:07:23.749Z",
  __v: 2,
 },
 {
  favList: ["7", "4"],
  _id: "5fa90f62ec765d001731df46",
  username: "Boy Howdy",
  createdAt: "2020-11-09T09:44:02.274Z",
  updatedAt: "2020-11-09T12:45:48.600Z",
  __v: 7,
 },
];

const initalCalendar = [
 {
  _id: "5fa916fcc94f2fbde6acb50a",
  date: "8-11-2020",
  userId: "5fa2efc54b2279a838761186",
  __v: 0,
  menuItems: [
   {
    _id: "5fa916fcec765d001731df4a",
    foodId: "4",
    quantity: 1,
   },
   {
    _id: "5fa916fcec765d001731df4b",
    foodId: "7",
    quantity: 1,
   },
   {
    _id: "5fa916fcec765d001731df4c",
    foodId: "1",
    quantity: 1,
   },
  ],
 },
 {
  _id: "5fa923d4c94f2fbde6b6061b",
  date: "9-11-2020",
  userId: "5fa2efc54b2279a838761186",
  __v: 0,
  menuItems: [
   {
    _id: "5fa93a01ff2f160017fe4f97",
    foodId: "97ab8148-a840-4352-b584-0b10cacaaedd",
    quantity: 1,
   },
  ],
 },
 {
  _id: "5fa9292ec94f2fbde6bc124e",
  date: "10-11-2020",
  userId: "5fa2efc54b2279a838761186",
  __v: 0,
  menuItems: [
   {
    _id: "5fa9292e52d59c0017877ca8",
    foodId: "a6bfcd9c-22fe-408c-9e56-c1b7f584cce9",
    quantity: 2,
   },
  ],
 },
 {
  _id: "5fa92a6ac94f2fbde6bd5902",
  date: "15-11-2020",
  userId: "5fa2efc54b2279a838761186",
  __v: 0,
  menuItems: [
   {
    _id: "5fa92a6a52d59c0017877ca9",
    foodId: "a6bfcd9c-22fe-408c-9e56-c1b7f584cce9",
    quantity: 1,
   },
  ],
 },
 {
  _id: "5fa92d0ac94f2fbde6bf876d",
  date: "9-11-2020",
  userId: "5fa2efc54b2279a838761186",
  __v: 0,
  menuItems: [
   {
    _id: "5fa92d0a52d59c0017877caa",
    foodId: "25",
    quantity: 3,
   },
   {
    _id: "5fa92d0a52d59c0017877cab",
    foodId: "24",
    quantity: 1,
   },
  ],
 },
];

module.exports = {
 initalMenu,
 initalUsers,
 initalCalendar,
};
