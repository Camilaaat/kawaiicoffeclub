const express = require('express');
const router = express.Router();
const controller = require('../controllers/intereses.controller');


router.get('/', controller.allIntereses);


router.get('/:id', controller.showInteres);


router.post('/', controller.storeInteres);


router.put('/:id', controller.updateInteres);


router.delete('/:id', controller.destroyInteres);

module.exports = router;
