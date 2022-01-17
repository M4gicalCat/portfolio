const {sendContactMessage, sendError} = require("../controller/discord.controller");


module.exports = (/*Discord*/ client) => {
    const router = (require('express').Router())
    router.post("/contact/sendMsg", (req, res) => {
        try{
            sendContactMessage(req.body.name, req.body["firstName"], req.body.email, req.body.message, client);
            res.redirect("/");
        } catch (e) {
            sendError(e, client, req.originalUrl);
            return res.redirect('/contact');
        }
    });
    return router;
};