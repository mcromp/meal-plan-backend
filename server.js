const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static('build'))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true,
 useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
 console.log("MongoDB database connection established successfully");
});

const menuRouter = require("./src/routes/menu");
app.use("/menu", menuRouter);
const userRouter = require("./src/routes/users");
app.use("/users", userRouter);
const calendarRouter = require("./src/routes/calendar");
app.use("/calendar", calendarRouter);

app.listen(port, () => {
 console.log(`Server is running on port: ${port}`);
});
