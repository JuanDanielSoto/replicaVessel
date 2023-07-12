const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection();

// Directorio Público
app.use( express.static('public') );

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );


// Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/elements', require('./routes/element') );


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});

