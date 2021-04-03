const express = require("express");
const userRouter = express.Router();

userRouter.use(express.urlencoded({ extended: true }));

const dummyData = [
  {
    image: "http://FAKEURL.COM",
    name: "Movie Night",
    location: "Room 2C",
    date: "Feb 3",
  },
  {
    image: "http://FAKEURL.COM",
    name: "Poker Night",
    location: "Room 2B",
    date: "Feb 12",
  },
  {
    image: "http://FAKEURL.COM",
    name: "BBQ Lunch",
    location: "Outside",
    date: "Feb 15",
  },
];

userRouter.get("/:user", (req, res) => {
  const userName = req.params.user;

  // DATABASE QUERY GOES HERE

  res.send(dummyData);
});

module.exports = userRouter;
