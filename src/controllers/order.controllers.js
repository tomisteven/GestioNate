const database = require('../database');

//veriicar conexion a la base de datos



const getOrders = async (req, res, next) => {
    
    
    try {
        const respuesta = await database.query('SELECT * FROM orders');
        res.json(respuesta.rows);
        /* database.end(); */
        
    } catch (error) {
        console.log(error)
    }
}
const getOrder = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const respuesta = await database.query('SELECT * FROM orders WHERE id = $1', [id]);
        res.json(respuesta.rows[0]);

    } catch (error) {
        console.log(error)
    }

}
const createOrder = async (req, res, next) => {
    try {
        const {
            product,
            description,
            price,
            cantidad,

            
            
        } = req.body;
        const respuesta = await database.query('INSERT INTO orders (product, description, price, cantidad) VALUES ($1, $2, $3, $4)', [product, description, price, cantidad]);

        res.json({
            message: 'Pedido creado',
            task: {
                product,
                description,
                price,
                cantidad
            }

        });
    } catch (error) {
        console.log(error)
    }
}
const editOrder = async (req, res, next) => {
    try {

        const {
            id
        } = req.params;

        const {
            product,
            description,
            price,
            cantidad

        } = req.body;
        

       const respuesta = await database.query('UPDATE orders SET product = $1, description = $2, price = $3, cantidad = $4 WHERE id = $5', [product, description, price, cantidad, id]); 

        res.json({
            message: 'Tarea actualizada',
            task: {
                product,
                description,
                price,
                cantidad

            }
        });
        
    } catch (error) {
        console.log(error)
    }

}
const deleteOrder = async (req, res, next) => {

    try {
        const {
            id
        } = req.params;
        const respuesta = await database.query('DELETE FROM orders WHERE id = $1', [id]);
        res.json({
            message: 'Pedido eliminado'
        });
    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    getOrders,
    getOrder,
    createOrder,
    editOrder,
    deleteOrder,
    /* completeTask, */
    
}