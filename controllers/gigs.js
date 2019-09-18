const express = require("express");
const router = express.Router();
const Gigs = require("../models/gigs.js");

//index
// router.get('/', (req, res)=> {
//   res.send('index');
// });

//create
router.post("/", (req, res) => {
  Gigs.create(req.body, (err, createdGig) => {
    res.json(createdGig);
  });
});

//index
router.get("/", (req, res) => {
  Gigs.find({}, (err, foundGigs) => {
    res.json(foundGigs);
  });
});

//delete
router.delete("/:id", (req, res) => {
  Gigs.findByIdAndRemove(req.params.id, (err, deletedGig) => {
    res.json(deletedGig);
  });
});

//update
router.put("/:id", (req, res) => {
  Gigs.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedGig) => {
      res.json(updatedGig);
    }
  );
});

module.exports = router;
