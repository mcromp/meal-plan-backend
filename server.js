const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// eslint-disable-next-line no-undef
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const menuRouter = require('./src/Routes/menu.js');
app.use('/menu', menuRouter);
const userRouter = require('./src/Routes/users.js');
app.use('/users', userRouter);
const calendarRouter = require('./src/Routes/calendar.js');
app.use('/calendar', calendarRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
