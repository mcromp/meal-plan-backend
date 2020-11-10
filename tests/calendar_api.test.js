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

describe("when calendar items are saved", () => {
 test("the calendar is returned as json", async () => {
  await api
   .get("/calendar")
   .expect(200)
   .expect("Content-Type", /application\/json/);
 });

 test("all calendar items are returned", async () => {
  const response = await api.get("/calendar");
  expect(response.body).toHaveLength(helper.initalCalendar.length);
 });
});

afterAll((done) => {
 mongoose.connection.close(done);
});
