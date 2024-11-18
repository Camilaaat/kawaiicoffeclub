const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarios.controller');

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'img_usuarios');
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

router.get('/', controller.allUsuarios);


router.get('/:id', controller.showUsuario);


router.post('/',uploads.single("url_imagen"), controller.storeUsuario);


router.put('/:id',uploads.single("url_imagen"), controller.updateUsuario);


router.delete('/:id', controller.destroyUsuario);

module.exports = router;