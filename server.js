//require('./server/config/config');
const express = require('express');
const hbs = require('hbs');
require('./hbs/helpers.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();



// Configuracion del puerto
require('./server/config/config');



// Parse application/x--www-for-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));
// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');



// Configurando globla de rutas
app.use(require('./server/routes/index'));







// CONECION DE MONGODB
mongoose.connect('mongodb://localhost:27017/Escuela1', (err, res) => {
    if (err) throw err;
    console.log('Base de datos run ...');
});


// PUERTO DE NODEJS
app.listen(process.env.PORT, () => {
    console.log('Escuchando peticiones en el puerto ', process.env.PORT);
});