const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientes.controller');


router.get('/', controller.allClientes);


router.get('/:id', controller.showCliente);


router.post('/', controller.storeCliente);


router.put('/:id', controller.updateCliente);


router.delete('/:id', controller.destroyCliente);

module.exports = router;
