const express = require('express');
const router = express.Router();
const controller = require('../controllers/fotos_clientes.controller'); 


router.get('/', controller.allFotosClientes);

router.get('/:id', controller.showFotoCliente);


router.post('/', controller.storeFotoCliente);


router.put('/:id', controller.updateFotoCliente);


router.delete('/:id', controller.destroyFotoCliente);

module.exports = router;
