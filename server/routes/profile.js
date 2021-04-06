const express = require("express");
const profileRouter = express.Router();
const queries = require("../../database/queries");

profileRouter.use(express.urlencoded({ extended: true }));

profileRouter.get("/:email", (req, res) => {
  const email = req.params.email;

  queries.getUserProfileByEmail(email, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

module.exports = profileRouter;
