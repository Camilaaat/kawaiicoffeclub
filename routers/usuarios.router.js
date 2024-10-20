const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios.controller');


router.get('/', controller.allUsuarios);


router.get('/:id', controller.showUsuario);


router.post('/', controller.storeUsuario);


router.put('/:id', controller.updateUsuario);


router.delete('/:id', controller.destroyUsuario);

module.exports = router;
