const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// const usersRouter = require("./routes/users");
// app.use("/users", usersRouter);

const menuRouter = require("./routes/menu/index");
app.use("/menu", menuRouter);
const userRouter = require("./routes/users/index");
app.use("/users", userRouter);

// app.get("/api/users/:name", (request, response) => {
//   const name = request.params.name;
//   const user = foodData.find((user) => {
//     return user.name === name;
//   });
//   if (user) {
//     response.json(user);
//   } else {
//     response.status(404).end();
//   }
// });

// app.delete("/api/users/:name", (request, response) => {
//   const name = request.params.name;
//   notes = notes.filter((name) => name.id !== name);

//   response.status(204).end();
// });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
