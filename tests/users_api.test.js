const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server");
const api = supertest(app);
const User = require("../src/Models/user.model");
const helper = require("./helpers/test_helper");

beforeEach(async () => {
 await User.deleteMany({});
 for (let user of helper.initalUsers) {
  let userObject = new User(user);
  await userObject.save();
 }
});

describe("when inital users are saved to 'users'", () => {
 test("the users are returned as json", async () => {
  await api
   .get("/users")
   .expect(200)
   .expect("Content-Type", /application\/json/);
 });

 test("all users are returned", async () => {
  const response = await api.get("/users");
  expect(response.body).toHaveLength(helper.initalUsers.length);
 });

 describe("viewing single user", () => {
  test("succeeds with valid id", async () => {
   const userToView = helper.initalUsers[0];
   const resultUser = await api
    .get(`/users/${userToView._id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
   const returnedUser = JSON.parse(JSON.stringify(userToView));
   expect(resultUser.body._id).toEqual(returnedUser._id);
  });
  test("fails with invalid id", async () => {
   const invalidId = "4444447xx";
   await api.get(`/users/${invalidId}`).expect(500);
  });
 });

 describe("signing up a new user", () => {
  test("succeeds with valid username", async () => {
   const validUsername = {
    username: "Test",
   };
   await api
    .post("/users/signup")
    .send(validUsername)
    .expect(200)
    .expect("Content-Type", /application\/json/);
   const response = await api.get("/users");
   const users = response.body.map((res) => res.username);
   expect(response.body).toHaveLength(helper.initalUsers.length + 1);
   expect(users).toContain("Test");
  });

  test("fails with invalid username", async () => {
   const invalidUsername = {
    color: 4,
   };
   await api.post("/users/signup").send(invalidUsername).expect(400);
   const response = await api.get("/users");
   expect(response.body).toHaveLength(helper.initalUsers.length);
  });
 });

 describe("deleting a user", () => {
  test("succeeds with vaild id", async () => {
   const usersBeforeDelete = await User.find({});
   const validId = {
    id: usersBeforeDelete[0]._id,
   };
   await api
    .delete("/users")
    .send(validId)
    .expect(200)
    .expect("Content-Type", /application\/json/);
   let usersAfterDelete = await User.find({});
   expect(usersAfterDelete).toHaveLength(usersBeforeDelete.length - 1);
   const users = usersAfterDelete.map((u) => u._id);
   expect(users).not.toContain(usersBeforeDelete[0]._id);
  });
  test("fails with invalid id", async () => {
   const invalidId = {
    name: "",
   };
   await api.delete("/users").send(invalidId).expect(400);
  });
 });

 describe("adding item to a user's favorite list", () => {
  test("succeeds with valid data", async () => {
   const usersBeforeFavAdd = await User.find({});
   const validData = {
    userId: usersBeforeFavAdd[0]._id,
    itemId: "19",
   };
   await api
    .post("/users/favAdd")
    .send(validData)
    .expect(201)
    .expect("Content-Type", /application\/json/);
   let usersAfterFavAdd = await User.find({});
   expect(usersAfterFavAdd[0].favList).toHaveLength(
    usersBeforeFavAdd[0].favList.length + 1
   );
   expect(usersAfterFavAdd[0].favList).toContain("19");
  });

  test("fails with invalid data", async () => {
   const invalidData = {
    itemId: "2",
   };
   await api.post("/users/favAdd").send(invalidData).expect(400);
  });

  test("fails with already added items", async () => {
   const users = await User.find({});
   const duplicatedData = {
    userId: users[0]._id,
    itemId: users[0].favList[0],
   };
   await api.post("/users/favAdd").send(duplicatedData).expect(400);
  });
 });

 describe("deleting item from a user's favorite list", () => {
  test("succeeds with valid data", async () => {
   const usersBeforeFavDelete = await User.find({});
   const userId = usersBeforeFavDelete[0]._id;
   const itemId = usersBeforeFavDelete[0].favList[0];
   const validData = {
    userId,
    itemId,
   };
   await api
    .post("/users/favRemove")
    .send(validData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

   const updatedUser = await User.findById(userId);
   expect(updatedUser.favList).toHaveLength(
    usersBeforeFavDelete[0].favList.length - 1
   );
   expect(updatedUser.favList).not.toContain(itemId);
  });
  test("fails with invalid data", async () => {
   const invalidData = {
    test: "fail",
   };
   await api.post("/users/favRemove").send(invalidData).expect(400);
  });
 });

 describe("deleting a user's entire favorite list", () => {
  test("succeeds with valid user id", async () => {
   const users = await User.find({});
   const validData = {
    userId: users[0]._id,
   };
   await api
    .post("/users/favClear")
    .send(validData)
    .expect(200)
    .expect("Content-Type", /application\/json/);
   const updatedUser = await User.findById(users[0]._id);
   expect(updatedUser.favList).toHaveLength(0);
  });
  test("fails with invalid data", async () => {
   const invalidData = {
    test: "",
   };
   await api.post("/users/favClear").send(invalidData).expect(400);
  });
 });
});

afterAll((done) => {
 mongoose.connection.close(done);
});
