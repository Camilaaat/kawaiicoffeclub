const express = require('express');
const router = express.Router();
const controller = require('../controllers/suscriptores.controller');

router.get('/', controller.allSuscriptores);


router.get('/:id', controller.showSuscriptor);


router.post('/', controller.storeSuscriptor);


router.put('/:id', controller.updateSuscriptor);


router.delete('/:id', controller.destroySuscriptor);

module.exports = router;
