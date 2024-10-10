const express = require('express');
const router = express.Router();
const controller = require('../controllers/tareas.controller');


router.get('/', controller.allTasks);


router.get('/:id', controller.showTask);


router.post('/', controller.storeTask);


router.put('/:id', controller.updateTask);


router.delete('/:id', controller.destroyTask);


module.exports = router;
