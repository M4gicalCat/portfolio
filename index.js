const nunjucks = require("nunjucks");
const express = require("express");
const port = 3000;

const app = express();

nunjucks.configure(__dirname + '/templates/', {
    autoescape: false,
    express: app,
    watch: false
});
app.set('views', __dirname + '/templates');
app.set('view engine', 'twig');

app.get("/", (req, res)=>{
    res.render("index", {nom: "M4gicalCat"});
})

app.listen(port, ()=>{
    console.log("Server listening on http://localhost:" + port);
})