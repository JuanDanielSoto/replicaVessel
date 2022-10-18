const { response } = require('express');
const { scrap } = require('../middlewares/scrap');
const Vessel = require('../models/Vessel');


const getList = async(req, res = response ) => {
    const { page, items } = req.body;
    // Leer la base de datos
    try {
        const dbUser = await Vessel.find();
        if(  !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: ' no existe'
            });
        }
        // Respuesta del servicio
        var pages = dbUser.length/items
        if(pages%1!=0){
            pages = parseInt(pages)+1;
        }else{
            pages = parseInt(pages);
        }
        var x = (page-1)*items;
        var y = x+items;
        // console.log(x, y);
        console.log("/api/elements/list: ",{ page, items })
        return res.json({
            ok: true,
            msg: {
                info: {
                    vessels: dbUser.length,
                    pages: pages,
                    actualPage: page
                },
                vessel: dbUser.slice(x, y)
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const obtenerdatos = async(req, res = response ) => {

    const { Vessel_Name } = req.body;
    // Leer la base de datos
    try {
        const dbUser = await Vessel.findOne({ Vessel_Name:Vessel_Name });
        if(  !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: Vessel_Name+' no existe'
            });
        }
        // Respuesta del servicio
        return res.json({
            ok: true,
            msg: dbUser
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const scrapData = async(req, res = response ) => {

    const { Vessel_Name } = req.body;
    // Leer la base de datos
    try {
        const dbUser = await Vessel.findOne({ Vessel_Name:Vessel_Name });
        if(  !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: Vessel_Name+' no existe'
            });
        }
        // Respuesta del servicio
        const coors = await scrap( dbUser.Source).then((coor) => {
            return coor;
        })
        return res.json({
            ok:true,
            msg: coors
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    obtenerdatos,
    scrapData,
    getList
}