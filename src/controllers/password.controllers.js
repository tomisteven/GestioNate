const database = require('../database');

const crateUser = async (req, res, next) => {
    try {
        const {
            name,
            contraseña
        } = req.body;

        console.log("req.body", req.body)

        const respuesta = await database.query('INSERT INTO users (name, contraseña) VALUES ($1, $2)', [name, contraseña]);

        console.log("respuesta", respuesta)

        res.json({
            message: 'Usuario creado',
            usuarios: {
                name,
                contraseña
            }
        });

    } catch (error) {
        console.log("error" , error)
    }
}
const getUsers = async (req, res, next) => {

    try {
        const respuesta = await database.query('SELECT * FROM users');
        res.json(respuesta.rows);
        
    } catch (error) {
        console.log("error", error)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        const respuesta = await database.query('DELETE FROM users WHERE id = $1', [id]);

        res.json({
            message: 'Usuario eliminado',
            usuario: {
                id
            }
        });

    } catch (error) {
        console.log("error", error)
    }
}


module.exports = {
    crateUser,
    getUsers,
    deleteUser
}