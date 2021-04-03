const express = require("express");
const userRouter = express.Router();

userRouter.use(express.urlencoded({ extended: true }));

userRouter.get("/:user", (req, res) => {
  const userName = req.params.user;

  // DATABASE QUERY GOES HERE

  res.send("DATABASE QUERY RESULTS");
});

module.exports = userRouter;
