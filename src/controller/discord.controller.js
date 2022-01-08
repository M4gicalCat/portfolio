const config = require('../config/config.json');
const {MessageEmbed} = require('discord.js');

module.exports.handleRouteConnection = function (req, /*Discord*/client) {
    client.guilds.cache.get(config.guild).channels.cache.get(config.connection_channel).send(`Connection on \`${req.originalUrl}\``);
}
module.exports.handleRoute404Connection = function (req, /*Discord*/client) {
    client.guilds.cache.get(config.guild).channels.cache.get(config.connection_channel).send(`**Connection on \`${req.originalUrl}\` returned 404**`);
}

module.exports.sendError = function (err, /*Discord*/ client, route) {
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
    client.guilds.cache.get(config.guild).channels.cache.get(config.error_channel).send({embeds: [embed]});
    client.guilds.cache.get(config.guild).channels.cache.get(config.error_channel).send(`<@${config.discord_id}>`);
}