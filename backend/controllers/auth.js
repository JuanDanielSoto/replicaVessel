const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../utils/jwt');

const crearUsuario = async(req, res=response) => {
    const { name, email, password} = req.body;
    try {
        //verificar email en db
        const usuario = await Usuario.findOne({ email});
        if (usuario){ return res.status(400).json({ok:false,msg:"Usuario ya existe"})}
        //crear usuario con el modelo
        const dbUser = new Usuario(req.body);
        //Hashear pwd
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);
        //Generar JWT
        const token = await generarJWT(dbUser.id, name);
        //Crear user en BD
        await dbUser.save();
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbUser.id,
            msg:"Usuario "+name+" creado",
            token, token
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg:"Contactar administrador"
        });
    }
    return res.status(200).json({
        ok:true,
        msg:"Creado",
    });
}

const login = (req, res) => {
    const {email, password} = req.body;
    return res.json({
        ok:true,
        msg:"Login de usuario",
        res: email+" "+password
    });
}

const renew = (req, res) => {
    const { name, email, password} = req.body;
    return res.json({
        ok:true,
        msg:"Renew",
    });
}


//exportamos
module.exports = {
    crearUsuario,
    login,
    renew
}