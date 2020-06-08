const express = require('express');
const _ = require('underscore');
const Padre = require('../models/modelsCaptura');

const { VerificacionToken } = require('../middlewares/autenticacion');
const app = express();


//=====================================
// Rutas de Captura
//=====================================



//=====================================
// Mostrar Captura
//=====================================
app.get('', (res, req) => {

});



//=====================================
// Registrar Captura
//=====================================
app.post('', (req, res) => {

});



//=====================================
// Mostrar Actualizar
//=====================================
app.put('', (req, res) => {

});




//=====================================
// Mostrar Eliminar
//=====================================
app.delete('', (req, res) => {

});

module.exports = app;