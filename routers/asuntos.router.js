const express = require('express');
const router = express.Router();
const controller = require('../controllers/asuntos.controller');


router.get('/', controller.allAsuntos);


router.get('/:id', controller.showAsunto);


router.post('/', controller.storeAsunto);


router.put('/:id', controller.updateAsunto);


router.delete('/:id', controller.destroyAsunto);

module.exports = router;
