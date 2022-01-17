const config = require("./config/config.json");

/* DISCORD */
const {Client, Intents} = require("discord.js");
require("./controller/discord.controller");
const client = new Client({intents: [Intents.FLAGS.GUILDS]});
const discordController = require("./controller/discord.controller");
const discordRoutes = require("./route/discord.routes");

/* EXPRESS */
const nunjucks = require("nunjucks");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const expressController = require("./controller/express.controller");
const {sendMessage} = require("./controller/discord.controller");
const routers = [];
routers.push(require("./route/main.route.js").router);
/* EXPRESS */

nunjucks.configure(__dirname + '/templates/', {
    autoescape: false,
    express: app,
    watch: false
});
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/../public'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'twig');

app.use((req, res, next) => {
    discordController.handleRouteConnection(req, client);
    expressController.handleRouteConnection(req, client);
    return next();
});

app.use(discordRoutes(client));

routers.forEach(r => app.use(r));

app.use((req, res) => {
    discordController.handleRoute404Connection(req, client);
    expressController.handleRoute404Connection(req, client);
    res.render("main/page404");
});

app.listen(config.port, ()=>{
    console.log("Server listening on http://localhost:" + config.port);
});

/* DISCORD */

client.login(config.token).then(() => {
    console.log("Discord client is connected");
    const date = new Date();
    sendMessage("Client connected at " + (date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours() )+ ":" + (date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()), client);
});