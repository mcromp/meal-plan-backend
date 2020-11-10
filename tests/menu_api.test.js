const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server");
const api = supertest(app);
const Menu = require("../src/Models/menu.model");
const helper = require("./helpers/test_helper");

beforeEach(async () => {
 await Menu.deleteMany({});
 for (let item of helper.initalMenu) {
  let menuObject = new Menu(item);
  await menuObject.save();
 }
});

describe("when inital food items saved to menu", () => {
 test("the menu is returned as json", async () => {
  await api
   .get("/menu")
   .expect(200)
   .expect("Content-Type", /application\/json/);
 });

 test("all menu items are returned", async () => {
  const response = await api.get("/menu");
  expect(response.body).toHaveLength(helper.initalMenu.length);
 });

 describe("adding a new item", () => {
  test("succeeds with valid data", async () => {
   const newItem = {
    item: "Coffee",
    filter: "DRINK",
   };
   await api
    .post("/menu/add")
    .send(newItem)
    .expect(200)
    .expect("Content-Type", /application\/json/);
   const response = await api.get("/menu");
   const items = response.body.map((res) => res.item);
   expect(response.body).toHaveLength(helper.initalMenu.length + 1);
   expect(items).toContain("Coffee");
  });

  test("fails without valid data", async () => {
   const newItem = {
    filter: "DRINK",
   };
   await api.post("/menu/add").send(newItem).expect(400);
   const response = await api.get("/menu");
   expect(response.body).toHaveLength(helper.initalMenu.length);
  });
 });

 describe("deleting an item", () => {
  test("succeeds with valid id", async () => {
   const menuBeforeDelete = await Menu.find({});
   const body = {
    id: menuBeforeDelete[0]._id,
   };
   await api.delete("/menu").send(body).expect(204);
   const menuAfterDelete = await Menu.find({});
   expect(menuAfterDelete).toHaveLength(menuBeforeDelete.length - 1);
   const items = menuAfterDelete.map((item) => item.id);
   expect(items).not.toContain(menuBeforeDelete[0].id);
  });
  test("fails with invalid id", async () => {
   const body = {
    id: "5555555xxxx",
   };
   await api.delete("/menu").send(body).expect(500);
  });
 });
});

afterAll(() => {
 mongoose.connection.close();
});
