"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var _require3 = require('../controllers/auth'),
    crearUsuario = _require3.crearUsuario,
    login = _require3.login,
    renew = _require3.renew;

var router = new Router(); // crear un nuevo usuario

router.post('/new', crearUsuario); // login

router.post('/', [check("email", "El email es obligatorio").isEmail()], login); // validar y revalidar

router.get('/renew', renew);
module.exports = router;