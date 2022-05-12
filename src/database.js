const {Pool
} = require('pg');
const {db} = require("./CONFIG")

const database = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database,

});

//verificar se o banco de dados está conectado
database.connect().then(() => {
    console.log("-------|||| base de datos conectada ||||---------");
}).catch(err => {
    console.log("error al conectar la base de datos", err);
})




module.exports = database;
