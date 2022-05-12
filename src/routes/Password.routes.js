const {Router} = require('express');
const db = require('../database');
const { crateUser, getUsers , deleteUser} = require('../controllers/password.controllers');

const router = Router();

router.post('/create', crateUser);
router.get('/getusers', getUsers);
router.delete('/users/delete/:id', deleteUser);



module.exports = router;