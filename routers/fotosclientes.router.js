const express = require('express');
const router = express.Router();
const controller = require('../controllers/fotosclientes.controller'); 

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'img_clientes');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploads = multer ({
    storage,
    fileFilter: (req, file, cb)=>{
        console.log(file);
        const filetypes = /jpg|jpeg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if (mimetype && path.extname){
            return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1},
});

router.get('/', controller.allFotosClientes);

router.get('/:id', controller.showFotoCliente);


router.post('/',uploads.single("ruta_imagen"), controller.storeFotoCliente);

router.put('/:id', uploads.single("ruta_imagen"), controller.updateFotoCliente);




router.delete('/:id', controller.destroyFotoCliente);

module.exports = router;
