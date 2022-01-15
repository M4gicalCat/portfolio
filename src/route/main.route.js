const express = require('express');
const {getAge} = require("../tools");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("main/root", {age: getAge()});
});

module.exports.router = router;