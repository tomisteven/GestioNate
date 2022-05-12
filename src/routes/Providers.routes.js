const {Router} = require('express');
const db = require('../database');
const {
    
    getProveedores,
    getProveedor,
    createProvedor,
    editProveedor,
    deleteProveedor

} = require("../controllers/proveedores.controllers");

const router = Router();

router.get('/', getProveedores)
router.get('/:id', getProveedor)
router.post('/create', createProvedor)
router.put('/edit/:id', editProveedor)
router.delete('/delete/:id',  deleteProveedor)


module.exports = router;