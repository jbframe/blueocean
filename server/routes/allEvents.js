const express = require("express");
const eventsRouter = express.Router();

eventsRouter.use(express.urlencoded({ extended: true }));

const dummyData = [
  {
    image: "http://FAKEURL.COM",
    name: "Pottery Class",
    location: "Room 1A",
    date: "Jan 31",
  },
  {
    image: "http://FAKEURL.COM",
    name: "Movie Night",
    location: "Room 2C",
    date: "Feb 3",
  },
  {
    image: "http://FAKEURL.COM",
    name: "Staff Meeting",
    location: "Room 3B",
    date: "Feb 8",
  },
  {
    image: "http://FAKEURL.COM",
    name: "Pizza Party",
    location: "Room 3A",
    date: "Feb 11",
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

eventsRouter.get("/", (req, res) => {
  // DATABASE QUERY GOES HERE

  res.send(dummyData);
});

module.exports = eventsRouter;
