const config = require('../config/config.json');
const {MessageEmbed} = require('discord.js');
const {db} = require("../config/db.config");

function handleRouteConnection (req, /*Discord*/client) {
    try {
    client.guilds.cache.get(config.guild).channels.cache.get(config.connection_channel).send(`Connection on \`${req.originalUrl}\``);
    } catch (e) {
        setTimeout(() => handleRouteConnection(req, client), 5000);
    }
}
function handleRoute404Connection (req, /*Discord*/client) {
    try {
        client.guilds.cache.get(config.guild).channels.cache.get(config.connection_channel).send(`**Connection on \`${req.originalUrl}\` returned 404**`);
    } catch (e) {
        setTimeout(() => handleRoute404Connection(req, client), 5000);
    }
}

function sendMessage(msg, /*Discord*/ client) {
    try {
        client.guilds.cache.get(config.guild).channels.cache.get(config.messages_channel).send(`${msg}`);
    } catch (e) {
        setTimeout(() => sendMessage(msg, client), 5000);
    }
}

function sendError (err, /*Discord*/ client, route) {
    const embed = new MessageEmbed()
        .setColor(err.fatal ? "#FF0033" : "#FF7030")
        .setTitle(`Error : ${err.code}`)
        .setDescription(err.message)
        .addField(
            "Fatal",
            err.fatal ? 'true' : 'false'
        ).addField(
            "Route",
            `\`${route}\``
        )
        .setTimestamp(new Date());
    try {
        client.guilds.cache.get(config.guild).channels.cache.get(config.error_channel).send({embeds: [embed], content: `<@${config.discord_id}>`});
    } catch (e) {
        setTimeout(() => sendError(err, client, route), 5000);
    }
}

function sendContactMessage(name, firstName, mail, msg, client) {
    let sql = `insert into contact value (NULL, ?, ?, ?, ?, ?);`;
    const bdd = db();
    bdd.execute(sql, [name, firstName, mail, msg, false], (err) => {
        if (err) {
            throw err;
        }
    });
    const embed = new MessageEmbed()
        .setColor("#FFFFFF")
        .setTitle("nouveau contact")
        .addField(
            "Nom",
            `${name}`,
            true
        )
        .addField(
            "Pr??nom",
            `${firstName}`,
            true
        )
        .addField(
            "Email",
            `\`${mail}\``,
            false
        )
        .addField(
            "Message",
            `${msg}`,
            false
        )
        .setTimestamp(new Date());
    client.guilds.cache.get(config.guild).channels.cache.get(config.contact_channel).send({embeds: [embed]}).then(()=>{
        sql = `update contact set discord=1 where id=last_insert_id();`;
        bdd.execute(sql, (err => {
            if (err)
                throw err;
        }));
    }).catch(e => {
        sendError(e, client, "/contact/sendMsg");
    });
}

module.exports = {
    handleRoute404Connection,
    handleRouteConnection,
    sendError,
    sendMessage,
    sendContactMessage
}