const database = require('../database');


const getTasks = async (req, res, next) => {
    
    try {
        const respuesta = await database.query('SELECT * FROM task');
        res.json(respuesta.rows);
        
    } catch (error) {
        console.log(error)
    }
}
const getTask = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const respuesta = await database.query('SELECT * FROM task WHERE id = $1', [id]);
        res.json(respuesta.rows[0]);

    } catch (error) {
        console.log(error)
    }

}
const createTask = async (req, res, next) => {
    try {
        const {
            title,
            description,
            color,
            complete
        } = req.body;
        const respuesta = await database.query('INSERT INTO task (title, description, color, complete) VALUES ($1, $2, $3, $4)', [title, description, color, complete]);

        res.json({
            message: 'Tarea creada',
            task: {
                title,
                description,
                color,
                complete
            }

        });
    } catch (error) {
        console.log(error)
    }
}
const editTask = async (req, res, next) => {
    try {

        const {
            id
        } = req.params;
        const {
            title,
            description
        } = req.body;

        const respuesta = await database.query('UPDATE task SET title = $1, description = $2 WHERE id = $3', [title, description, id]);

        res.json({
            message: 'Tarea actualizada',
            task: {
                title,
                description
            }
        });
        
    } catch (error) {
        console.log(error)
    }

}
const deleteTask = async (req, res, next) => {

    try {
        const {
            id
        } = req.params;
        const respuesta = await database.query('DELETE FROM task WHERE id = $1', [id]);
        res.json({
            message: 'Tarea eliminada'
        });
    } catch (error) {
        console.log(error)
    }

}
const completeTask = async (req, res, next) => {
    const {id} = req.params;
    const task = await database.query('SELECT * FROM task WHERE id = $1', [id]);
    const {complete} = task.rows[0];
    //console.log(task.rows[0].complete);

    const respuesta = await database.query('UPDATE task SET complete = $1 WHERE id = $2', [!complete, id]);
    res.json({
        complete: complete,
        
    })
    console.log("body:" , complete, id)
};


module.exports = {
    getTask,
    getTasks,
    editTask,
    deleteTask,
    createTask,
    completeTask
}