const database = require('../database');


const getProveedores = async (req, res, next) => {
    
    
    try {
        const respuesta = await database.query('SELECT * FROM proveedores');
        res.json(respuesta.rows);
        
    } catch (error) {
        console.log(error)
    }
}
const getProveedor = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const respuesta = await database.query('SELECT * FROM proveedores WHERE id = $1', [id]);
        res.json(respuesta.rows[0]);

    } catch (error) {
        console.log(error)
    }

}
const createProvedor = async (req, res, next) => {
    try {
        const {
            product,
            direction,
            name,
            telefono,
            cantidadproduct,
            email

        } = req.body;
        const respuesta = await database.query('INSERT INTO proveedores (product, name, direction, telefono, cantidadproduct, email) VALUES ($1, $2, $3, $4, $5, $6)', [product, name, direction , telefono, cantidadproduct, email]);

        res.json({
            message: 'Proveedor guardado',
            task: {
                product,
                direction,
                name,
                telefono,
                cantidadproduct,
                email
            }

        });
    } catch (error) {
        console.log(error)
    }
}
const editProveedor = async (req, res, next) => {
    try {

        const {
            id
        } = req.params;
        const {

            product,
            direction,
            name,
            telefono,
            cantidadproduct,
            email

        } = req.body; 

        const respuesta = await database.query('UPDATE proveedores SET product = $1, name = $2, direction = $3, telefono = $4, cantidadproduct = $5, email = $6  WHERE id = $7', [product, name, direction, telefono, cantidadproduct, email, id]);

        res.json({
            message: 'Proveedor actualizado',
            task: {
                product,
                direction,
                name,
                telefono,
                cantidadproduct,
                email
            }
        });
        
    } catch (error) {
        console.log(error.message)
    }

}
const deleteProveedor = async (req, res, next) => {

    try {
        const {
            id
        } = req.params;
        const respuesta = await database.query('DELETE FROM proveedores WHERE id = $1', [id]);
        res.json({
            message: 'Proveedor eliminado'
        });
    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    getProveedores,
    getProveedor,
    createProvedor,
    editProveedor,
    deleteProveedor
}