const {db} = require('../config/db.config');
const discordController = require('./discord.controller');

module.exports.handleRouteConnection = function (req, client) {
    db().query(`select nombre from connections where url=?;`, [req.originalUrl], (err, rows)=> {
        if (err)
            return discordController.sendError(err, client, req.originalUrl);
        let d = new Date(),
            month = `${(d.getMonth() + 1)}`,
            day = `${d.getDate()}`,
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (rows.length === 0) {
            db().query(`insert into connections value (?, ?, ?)`, [req.originalUrl, 1, `${day}-${month}-${year}`], (err) => {
                if (err)
                    return discordController.sendError(err, client, req.originalUrl);
            });
        } else {
            db().query(`update connections set nombre=nombre+1, last=? where url=?;`, [`${day}-${month}-${year}`, req.originalUrl], (err) => {
                if (err)
                    return discordController.sendError(err, client, req.originalUrl);
            });
        }
    });
}