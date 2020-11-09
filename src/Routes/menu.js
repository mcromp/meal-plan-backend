const router = require('express').Router();
const getAllMenu = require('../Controllers/Menu/getAllMenu');
const addMenu = require('../Controllers/Menu/addMenu');
const deleteMenu = require('../Controllers/Menu/deleteMenu');

router.get('/', getAllMenu);

router.post('/add', addMenu);

router.delete('/', deleteMenu);



module.exports = router;
