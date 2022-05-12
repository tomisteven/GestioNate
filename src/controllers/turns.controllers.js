const database = require('../database');


const createTurn = async (req, res, next) => {
 try{
    const { title, description, date } = req.body;

    const respuesta = await database.query('INSERT INTO turns (title, description, date) VALUES ($1, $2, $3)', [title, description, date]);

    res.json({
        message: 'Turno creado',
        turn: {
            title,
            description,
            date
        }
    });

    }
    catch(error){
        console.log(error)
    }

}



const getTurns = async (req, res, next) => {
    try {
        const respuesta  = await database.query('SELECT * FROM turns');
        res.json(respuesta.rows);
        
    } catch (error) {
        console.log(error)
        
    }
}

const getTurn  = async (req, res, next) => {

    try{
    const {id} = req.params;
    const respuesta = await database.query('SELECT * FROM turns WHERE id = $1', [id]);
    res.json(respuesta.rows[0]);
    }
    catch(error){
        console.log(error)
    }

}

const editTurn = async (req, res, next) => {

    try {
        console.log(req.body)
        const {id} = req.params;
        const {
            title,
            description,
            date
        } = req.body;
        const respuesta = await database.query('UPDATE turns SET title = $1, description = $2, date = $3 WHERE id = $4', [title, description, date, id]);
    
        
        res.json({
            message: 'Turno actualizado',
            turn: {
                title,
                description,
                date
            }
        });
    } catch (error) {
        console.log(error)
    }

    
}


const deleteTurn = async (req, res, next) => {

    try{

        const {id} = req.params
        const respuesta = await database.query('DELETE FROM turns WHERE id = $1', [id]);
    
        
            res.json({
                message: 'Turno eliminado'
            });
        
    }
    catch(error){
       console.log(error)
    }
}

module.exports = {
    createTurn,
    getTurns,
    getTurn,
    editTurn,
    deleteTurn
    
}