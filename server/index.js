const path = require("path");
const express = require("express");

const app = express();
var cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 4000;

// ROUTE IMPORTS
const userRouter = require("./routes/userEvents");
const eventsRouter = require("./routes/allEvents");
const signUpRouter = require("./routes/addToEvent");

// ROUTES
app.use("/user", userRouter);
app.use("/events", eventsRouter);
app.use("/signup", signUpRouter);

// DATABASE AND SERVER CONNECTION
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
