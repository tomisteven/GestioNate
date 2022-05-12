const {Router} = require('express');
const db = require('../database');
const { getTurns, getTurn, editTurn, deleteTurn, createTurn } = require('../controllers/turns.controllers');

const router = Router();

router.get('/', getTurns)
router.get('/:id', getTurn)
router.post('/create', createTurn)
router.put('/edit/:id', editTurn)
router.delete('/delete/:id',   deleteTurn)


module.exports = router;