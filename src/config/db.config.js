const config = require('./config.json');
const mysql = require("mysql2");
module.exports.db = () => {
     return mysql.createConnection({
         host: config.db_host,
         user: config.db_user,
         database: config.db_name,
         password: config.db_password
     });
 };