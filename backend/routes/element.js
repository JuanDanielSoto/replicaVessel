const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerdatos, scrapData } = require('../controllers/element');


const router = Router();

// Traer info
router.post( '/', [
    check('Vessel_Name', 'El nombre es obligatorio').not().isEmpty()],
    obtenerdatos 
    );

router.put( '/scrap', [
    check('Vessel_Name', 'El nombre es obligatorio').not().isEmpty()],
    scrapData 
    );
    


module.exports = router;