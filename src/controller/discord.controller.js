const config = require('../config/config.json');
const {MessageEmbed} = require('discord.js');

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
        );
    try {
        client.guilds.cache.get(config.guild).channels.cache.get(config.error_channel).send({embeds: [embed]});
        client.guilds.cache.get(config.guild).channels.cache.get(config.error_channel).send(`<@${config.discord_id}>`);
    } catch (e) {
        setTimeout(() => sendError(err, client, route), 5000);
    }
}

module.exports = {
    handleRoute404Connection,
    handleRouteConnection,
    sendError,
    sendMessage
}