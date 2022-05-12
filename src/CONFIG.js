const _port = 4000;
const _urlTasks = `http://localhost:${_port}/api/tasks`;
const _urlTurns = `http://localhost:${_port}/api/turns`;

const {
    config
} = require("dotenv")
config()
 


module.exports = {
    _port: _port,
    _urlTasks: _urlTasks,
    _urlTurns: _urlTurns,
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    }, 
    auth00: {
        domain: process.env.DOMAIN_AUTH,
        clientId: process.env.CLIENT_AUTH
    }

}