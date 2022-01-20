const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const {db} = require("../config/db.config");
const {sendError} = require("./discord.controller");
const {MessageEmbed} = require("discord.js");
const {REST} = require("@discordjs/rest");
const config = require('../config/config.json');
const bdd = db();

async function init(/*Discord*/client) {
    const cmd_routes = {
        data: new SlashCommandBuilder()
            .setName('route')
            .setDescription(`Shows some info about a certain route.`)
            .addStringOption(option => {
                option
                    .setName("route")
                    .setDescription(`the route`)
                    .setRequired(false)
            }),
        getRouteInfo
    };

    const rest = new REST({version: '9'}).setToken(config.token);

    try {
        console.log(`Creating slash commands ...`);
        await rest.put(
            Routes.applicationGuildCommands(config.bot_id, config.guild), {body: cmd_routes.data}
        )
    } catch (e) {
        console.log(e);
    }
}

async function getRouteInfo(interaction) {
    const route = interaction.options.getString('route') ?? "/";
    const sql = `select nombre, last from connections where url=?;`;
    bdd.execute(sql, [`${route}`], async (err, rows) => {
        if (err) return sendError(err, client, "Discord");
        const embed = new MessageEmbed()
            .setTitle("Route info")
            .setColor("#00ABAB")
            .setTimestamp(new Date());
        if (rows.length === 0) {
            bdd.execute(sql, [`404`], async (err, rows) => {
                if (err) return sendError(err, client, "Discord");
                if (rows.length === 0) {
                    embed
                        .addField("Route", "Page 404")
                        .addField("Vues", "0");
                    await interaction.reply({embeds: [embed]});
                    return;
                }
                embed
                    .addField("Route", "Page 404")
                    .addField("Vues", rows[0]["nombre"])
                    .addField("Dernière visite", rows[0]["last"]);
                await interaction.reply({embeds: [embed]});
            });
            return;
        }
        embed
            .addField("Route", `**\`${route}\`**`)
            .addField("Vues", rows[0]["nombre"])
            .addField("Dernière visite", rows[0]["last"]);
        await interaction.reply({embeds: [embed]});
    });
}

module.exports = {
    init
}