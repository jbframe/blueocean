const path = require("path");
const express = require("express");
const bodyparser = require('body-parser'); // ????? SYNTAX?

const app = express();
var cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded()); // ??? SYNTAX?

const port = 4000;

// ROUTE IMPORTS
const userRouter = require("./routes/userEvents");
const eventsRouter = require("./routes/allEvents");
const signUpRouter = require("./routes/addToEvent");
const photosRouter = require("./routes/photos");
const profileRouter = require("./routes/profile");

// ROUTES
app.use("/user", userRouter);
app.use("/events", eventsRouter);
app.use("/signup", signUpRouter);
app.use("/photos", photosRouter);
app.use("/profile", profileRouter);

// DATABASE AND SERVER CONNECTION
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
