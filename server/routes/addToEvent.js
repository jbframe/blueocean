const express = require("express");
const signUpRouter = express.Router();

signUpRouter.use(express.json());

signUpRouter.put("/", (req, res) => {
  const user_id = req.body.user_id;
  const event_id = req.body.event_id;

  // DATABASE UPDATE GOES HERE

  res.sendStatus(200);
});

module.exports = signUpRouter;
