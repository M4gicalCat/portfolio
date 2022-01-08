const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("main/root", {nom: "M4gicalCat"});
});

module.exports.router = router;