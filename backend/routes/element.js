const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerdatos, scrapData, getList } = require('../controllers/element');


const router = Router();

// Traer info
router.post( '/', [
    check('Vessel_Name', 'El nombre es obligatorio').not().isEmpty()],
    obtenerdatos 
    );
    
router.post( '/list',[
    check('page', 'Número que se necesita para dividir el total de elementos de la base de datos').isNumeric(),
    check('items', 'Número que se necesita para saber cuantos elementos mostrar por página').isEmpty(),
    ],getList);

router.put( '/scrap', [
    check('Vessel_Name', 'El nombre es obligatorio').not().isEmpty()],
    scrapData 
    );


module.exports = router;