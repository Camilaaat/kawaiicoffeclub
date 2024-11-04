const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactos.controller'); 


router.get('/', controller.allContactos);


router.get('/:id', controller.showContacto);


router.post('/', controller.storeContacto);


router.put('/:id', controller.updateContacto);


router.delete('/:id', controller.destroyContacto);

module.exports = router;
