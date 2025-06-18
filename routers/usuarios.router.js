const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios.controller");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'img_usuarios');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    const filetypes = /jpg|jpeg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error("Tipo de archivo no soportado"));
  },
  limits: { fileSize: 1024 * 1024 * 1 }, // 1MB
});

router.get('/', usuarioController.allUsuarios);
router.get('/:id', usuarioController.showUsuario);

// POST con manejo de error multer
router.post('/', (req, res, next) => {
  uploads.single("url_imagen")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, usuarioController.storeUsuario);

router.put('/:id', (req, res, next) => {
  uploads.single("url_imagen")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, usuarioController.updateUsuario);

router.delete('/:id', usuarioController.destroyUsuario);

router.post("/login", usuarioController.loginUsuario);

module.exports = router;
