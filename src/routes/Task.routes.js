const {Router} = require('express');
const db = require('../database');
const { getTask, getTasks, editTask, deleteTask, createTask, completeTask } = require('../controllers/tasks.controllers');

const router = Router();

router.get('/', getTasks)
router.get('/:id', getTask) 
router.post('/create', createTask)
router.put('/edit/:id', editTask) 
router.delete('/delete/:id', deleteTask)
router.put('/complete/:id',  completeTask)


module.exports = router;