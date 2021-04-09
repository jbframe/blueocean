const express = require("express");
const photosRouter = express.Router();
const queries = require("../../database/queries");

photosRouter.use(express.urlencoded({ extended: true }));

photosRouter.post("/user/:id", (req, res) => {
    let id = req.params.id;
    let url = req.body;

    queries.insertEventPhoto(id, url, (err, results) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.sendStatus(201)
        }
    })
})

photosRouter.post("/event/:id", (req, res) => {
    let id = req.params.id;
    let url = req.body;
    
    queries.updateUserProfile({ id, url }, (err, results) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.sendStatus(201)
        }
    })
})

photosRouter.get("/event/:id", (req, res) => {
    queries.getEventPhotos(req.params.id, (err, results) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(results);
        }
    })
})

module.exports = photosRouter;