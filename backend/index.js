const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor/aplicación de express
const app = express();

//conexión a DB
dbConnection();

//directorio publico
app.use(express.static('public'));

//CORS
app.use(cors());

//Lectura y parseo del body para
app.use(express.json());

//rutas
app.use('/api/auth', require("./routes/auth"));

//server
app.listen(process.env.PORT, ()=> {
    console.log(`Server started port ${process.env.PORT}`);
});