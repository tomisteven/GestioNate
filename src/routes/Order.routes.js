const {Router} = require('express');
const db = require('../database');
const {
    getOrders,
    getOrder,
    createOrder,
    editOrder,
    deleteOrder
} = require("../controllers/order.controllers");

const router = Router();

router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/create', createOrder)
router.put('/edit/:id', editOrder)
router.delete('/delete/:id',  deleteOrder)


module.exports = router;