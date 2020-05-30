const express = require('express');
const views = express();

views.get('/', (req, res) => {
    res.render('home');
});
views.get('/Estudiantes', (req, res) => {
    res.render('Estudiante');
});
views.get('/Usuario', (req, res) => {
    res.render('Usuarios');
});
views.get('/Padres', (req, res) => {
    res.render('Padres');
});

module.exports = views;