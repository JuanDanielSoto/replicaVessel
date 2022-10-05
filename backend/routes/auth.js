const { Router }= require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renew } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = new Router();

// crear un nuevo usuario
router.post('/new', [
    check("name", "El name es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").isLength({min:4}),
    validarCampos
],crearUsuario);

// login
router.post('/', [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").isLength({min:4}),
    validarCampos
],login);

// validar y revalidar
router.get('/renew', [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").isLength({min:4}),
    validarCampos
],renew);

module.exports = router;