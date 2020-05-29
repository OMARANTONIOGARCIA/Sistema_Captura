require('./config/config');
const express = require('express');
const app = express();
const hbs = require('hbs');
require('../hbs/helpers.js');
const bodyParser = require('body-parser');
// Parse application/x--www-for-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use(express.static(__dirname + '/public'));
// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('home');
});
app.get('/Estudiantes', (req, res) => {
    res.render('RegAlumnos');
});
app.get('/Usuario', (req, res) => {
    res.render('RegUsuarios');
});
app.get('/Padres', (req, res) => {
    res.render('RegPadres');
});

// Rutas de views Registro
app.get('/Control', (req, res) => {
    res.json(console.log('get usuario'));
});

app.post('/Control', (req, res) => {

    let body = req.body;
    let result = body.nombre === undefined ? res.status(400).json({ ok: false, mensaje: 'Faltan datos' }) : res.json({ persona: body })
});

app.put('/Control/:id', (req, res) => {
    let id = req.params.id
    res.json({ id });
});
app.delete('/Control/:id', (req, res) => {
    res.json(console.log('get usuario'));
});

// Rutas de views Registro



app.listen(process.env.PORT, () => {
    console.log(`Escuchando peticiones en el puerto ${ process.env.PORT }`);
});