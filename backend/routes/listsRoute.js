const router = require("express").Router();
const verify = require("../UserToken");
const express = require("express");
let List = require("../models/List");


//Handle GET request for lists
router.get("/", (req,res) => {
    List.find()
        .then(lists => res.json(lists))
        .catch(err => res.status(400).json("Error: " + err));
});

//Handle get GET request for specific id
router.get("/:id", (req,res) => {
    List.findById(req.params.id)
        .then(list => res.json(list))
        .catch(err => res.status(400).json("Error: " + err));
});

//Handle DELETE request for specific id, need to be logged in to do this
router.delete("/:id", verify, (req,res) => {
    List.findByIdAndDelete(req.params.id)
        .then(() => res.json("List deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

//Handle POST request to add object (verify is included to prevent non users from posting lists)
router.post("/add", verify, (req, res) => {
    const type = req.body.type;
    const headline = req.body.headline;
    const content = req.body.content;
    //const key = Math.random();

    const newList = new List({
        type,
        headline,
        content

    });

    //Save the list to the database
    newList.save()
        .then(() => res.json("List added."))
        .catch(err => res.status(400).json("Error: " + err));
});

//Add request to be able to edit the list
router.post("/edit/:id", verify, (req, res) => {

    List.findById(req.params.id)
        .then(list => {
            list.type = req.body.type;
            list.headline = String(req.body.headline);
            list.content = String(req.body.content);
        

             //Save the list to the database
            list.save()
                .then(() => res.json("List updated."))
                .catch(err => res.status(400).json("Error: " + err));
            })
});

 module.exports = router;

