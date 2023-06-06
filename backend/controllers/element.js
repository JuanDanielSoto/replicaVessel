const { response } = require('express');
const { scrap } = require('../middlewares/scrap');
const { filterList } = require('../middlewares/validar-campos');
const Vessel = require('../models/Vessel');


const getList = async(req, res = response ) => {
    const { page, items, photo, coors, built, gt, dwt, size } = req.body;
    // Leer la base de datos
    console.log(photo);
    try {
        const dbUser = await Vessel.find();
        if(  !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: ' no existe'
            });
        }
        // Respuesta del servicio
        let filter = []
        for(let i of dbUser){
            if(photo||coors){
                if(photo&&coors){
                    if(i["photoReal"]&&i["coords"]){
                        filter.push(i);
                    }
                }else{
                    if(photo&&i["photoReal"]){
                        filter.push(i);
                    }
                    if(coors&&i["coords"]){
                        filter.push(i);
                    }
                }
            }else{
                filter.push(i);
            }
        }
        filter = filterList(filter, { built, gt, dwt, size });
        var pages = filter.length/items
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
                    vessels: filter.length,
                    pages: pages,
                    actualPage: page
                },
                vessel: filter.slice(x, y)
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
        console.log("/api/elements  200");
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
    console.log("/api/elements/scrap");
    const { Vessel_Name } = req.body;
    // Leer la base de datos
    try {
        const dbUser = await Vessel.findOne({ Vessel_Name:Vessel_Name });
        if(  !dbUser ) {
            console.log("400");
            return res.status(400).json({
                ok: false,
                msg: Vessel_Name+' no existe'
            });
        }
        // Respuesta del servicio
        console.log(dbUser.Source);
        const coors = await scrap( dbUser.Source).then((coor) => {
            return coor;
        });
        console.log("200");
        return res.json({
            ok:true,
            msg: coors
        });
    } catch (error) {
        console.log("500", error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const scrapAllData = async() =>{
    return res.json({
        ok:true,
        msg: coors
    });
}

module.exports = {
    obtenerdatos,
    scrapData,
    getList,
    scrapAllData
}