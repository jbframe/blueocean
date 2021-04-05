const express = require("express");
const userRouter = express.Router();
const queries = require("../../database/queries");

userRouter.use(express.urlencoded({ extended: true }));

userRouter.get("/:user", (req, res) => {
  const userName = req.params.user;

  queries.getEventsByAttendee(userName, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = userRouter;
