const { response } = require('express');
const { validationResult } = require('express-validator');



const validarCampos = (req, res = response, next ) => {
    
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

const filterList = (list, keys) =>{
    const { built, gt, dwt, size } = keys;
    let newList = []; noFilters=true;
    for(let i of list){
        if(built&&built!=""){
            start = parseInt(built.split("/")[0]);
            end = parseInt(built.split("/")[1]);
            x = parseInt(i["Built"]);
            if(x>=start&&x<=end){
                newList.push(i);
            }
            if(noFilters){ noFilters=false; }
        }
        if(gt&&gt!=""){
            console.log("gt");
            start = parseInt(gt.split("/")[0]);
            end =   parseInt(gt.split("/")[1]);
            x = parseInt(i["GT"]);
            if(x>=start&&x<=end){
                newList.push(i);
            }
            if(noFilters){ noFilters=false; }
        }
        if(dwt&&dwt!=""){
            console.log("dwt");
            start = parseInt(dwt.split("/")[0]);
            end =   parseInt(dwt.split("/")[1]);
            x = parseInt(i["DWT"]);
            if(x>=start&&x<=end){
                newList.push(i);
            }
            if(noFilters){ noFilters=false; }
        }
        if(size&&size!=""){
            console.log("size");
            start = parseInt(size.split("/")[0]);
            end = parseInt(size.split("/")[1]);
            if(i["Size_m"]!="-"){
                x = parseInt(i["Size_m"].replace(" ").split("/")[0]);
                y = parseInt(i["Size_m"].replace(" ").split("/")[1]);
                if(x>=start&&y<=end){
                    newList.push(i);
                }
            }
            if(noFilters){ noFilters=false; }
        }
    }
    if(noFilters){
        console.log("no filtros extra");
        return list;
    }
    return newList;
}

module.exports = {
    validarCampos,
    filterList
}
