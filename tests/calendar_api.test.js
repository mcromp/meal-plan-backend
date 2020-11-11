const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server");
const api = supertest(app);
const Calendar = require("../src/Models/calendar.model");
const helper = require("./helpers/test_helper");

beforeEach(async () => {
 await Calendar.deleteMany({});
 for (let item of helper.initalCalendar) {
  let calendarItem = new Calendar(item);
  await calendarItem.save();
 }
});

describe("when calendar items are saved to inital calendar", () => {
 test("the calendar is returned as json", async () => {
  await api
   .get("/calendar")
   .expect(200)
   .expect("Content-Type", /application\/json/);
 });

 test("all calendar items can be returned", async () => {
  const response = await api.get("/calendar");
  expect(response.body).toHaveLength(helper.initalCalendar.length);
 });

 describe("fetching select calendar items of a user", () => {
  test("succeeds with a valid data", async () => {
   const calendarItems = await Calendar.find({});
   const validData = {
    dateList: ["8-11-2020", "9-11-2020", "10-11-2020"],
   };
   await api
    .post(`/calendar/user/${calendarItems[0].userId}/`)
    .send(validData)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  });
  test("fails with invalid User Id", async () => {
   const validData = {
    dateList: ["8-11-2020", "9-11-2020", "10-11-2020"],
   };
   await api.post("/calendar/user/000/").send(validData).expect(400);
  });
 });

 describe("deleting  a user's calendar", () => {
  test("succeeds with valid data", async () => {
   const calendarItems = await Calendar.find({});
   const validData = {
    id: calendarItems[0].userId,
   };
   await api
    .delete("/calendar/user/")
    .send(validData)
    .expect(200)
    .expect("Content-Type", /application\/json/);
   const updatedCalendarItems = await Calendar.find({
    userId: calendarItems[0].userId,
   });
   expect(updatedCalendarItems).toHaveLength(0);
  });
  test("does nothing with invalid data", async () => {
   const calendarItems = await Calendar.find({});
   const invalidData = {
    id: "000",
   };
   await api.delete("/calendar/user/").send(invalidData);
   const updatedCalendarItems = await Calendar.find({
    userId: calendarItems[0].userId,
   });
   expect(updatedCalendarItems).toHaveLength(calendarItems.length);
  });
 });

 describe("updating a calendar's food items", () => {
  test("updates with valid data", async () => {
   const calendar = await Calendar.find({});
   const menuItems = [{ foodId: "1", quantity: 4 }];
   const date = calendar[0].date;
   const validData = {
    menuItems,
    userId: calendar[0].userId,
    date,
   };
   await api
    .post("/calendar/update")
    .send(validData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

   const calendarUpdated = await Calendar.find({
    userId: calendar[0].userId,
    date: date,
   });
   const menuItemsUpdated = calendarUpdated[0].menuItems.map((item) => ({
    foodId: item.foodId,
    quantity: item.quantity,
   }));
   expect(calendarUpdated[0].menuItems).toHaveLength(menuItems.length);
   expect([...menuItemsUpdated]).toEqual([...menuItems]);
  });
  test("creates new calendar item with valid data", async () => {
   const calendar = await Calendar.find({});
   const validData = {
    menuItems: [],
    userId: calendar[0].userId,
    date: "12-12-2020",
   };
   await api
    .post("/calendar/update")
    .send(validData)
    .expect(200)
    .expect("Content-Type", /application\/json/);
   const calendarUpdated = await Calendar.find({
    userId: calendar[0].userId,
    date: "12-12-2020",
   });
   expect(calendarUpdated[0]).toBeTruthy();
  });
  test("fails with invalid data", async () => {
   await api.post("/calendar/update").send({ invalidData: "" }).expect(400);
  });
 });
});

afterAll(() => {
 mongoose.connection.close();
});
