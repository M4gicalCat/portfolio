const {db} = require('../config/db.config');
const tools = require('../tools');
const discordController = require('./discord.controller');

module.exports.handleRouteConnection = function (req, client) {
    db().query(`select nombre from connections where url=?;`, [req.originalUrl], (err, rows)=> {
        if (err)
            return discordController.sendError(err, client, req.originalUrl);
        let d = tools.getDate();
        if (rows.length === 0) {
            db().query(`insert into connections value (?, ?, ?)`, [req.originalUrl, 1, d], (err) => {
                if (err)
                    return discordController.sendError(err, client, req.originalUrl);
            });
        } else {
            db().query(`update connections set nombre=nombre+1, last=? where url=?;`, [d, req.originalUrl], (err) => {
                if (err)
                    return discordController.sendError(err, client, req.originalUrl);
            });
        }
    });
}

module.exports.handleRoute404Connection = function (req, client) {
    db().query(`select nombre from connections where url='404';`, (err, rows)=> {
        if (err)
            return discordController.sendError(err, client, req.originalUrl);
        let d = tools.getDate();
        if (rows.length === 0) {
            db().query(`insert into connections value ('404', ?, ?)`, [1, d], (err) => {
                if (err)
                    return discordController.sendError(err, client, req.originalUrl);
            });
        } else {
            db().query(`update connections set nombre=nombre+1, last=? where url='404';`, [d, req.originalUrl], (err) => {
                if (err)
                    return discordController.sendError(err, client, req.originalUrl);
            });
        }
    });
}