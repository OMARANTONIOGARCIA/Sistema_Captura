const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/modelsUsuario');
const app = express();

app.post('/login', (req, res) => {

    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({ ok: false, err });
        }

        if (!usuarioDB) {
            return res.status(400).json({ ok: false, err: { mensaje: 'Usuario o Contraseña incorrecto' } });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({ ok: false, err: { messaje: 'Usuario o Contraseña incorrectos' } });
        }

        let token = jwt.sing({ usuario: usuarioDB }, 'este-desarrollo', { expiresIn: 60 * 60 * 24 * 60 });


        res.status(200).json({ ok: true, usuario: usuarioDB, token });

    });

});


module.exports = app;