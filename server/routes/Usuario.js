const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/modelsUsuario');
const app = express();

// Rutas de Usuario
app.get('/Users', (req, res) => {

    let pag = req.query.pag || 0;
    pag = Number(pag);
    let limite = req.query.limite || 15;
    limite = Number(limite);


    Usuario.find({ estado: true }, '_id nombre apeMaterno apePaterno email role img').skip(pag).limit(limite).exec((err, usuario) => {

        if (err) { return res.status(400).json({ ok: false, err }) }

        Usuario.count({ estado: true }, (err, conteo) => {

            res.status(200).json({ Ok: true, users: usuario, count: conteo });

        });

    });

});

app.post('/Users', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apeMaterno: body.materno,
        apePaterno: body.paterno,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        img: body.img
    });

    usuario.save((err, UsuarioDB) => {

        let result = err ? res.status(400).json({ ok: false, mensaje: 'Faltan datos', err }) : res.status(200).json({ Ok: true, usuario: UsuarioDB });
        return result;

    });

});

app.put('/Users/:id', (req, res) => {

    let id = req.params.id
    let body = _.pick(bod.req, ['nombre', 'apeMaterno', 'apePaterno', 'email', 'img', 'role']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) { return res.status(400).json({ ok: false, err }); }
        res.status(200).json({ ok: true, usuario: usuarioDB })
    })

});


app.delete('/Users/:id', (req, res) => {

    let id = req.params.id;
    let cambioEstado = { estado: false };

    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usersDelete) => {

        if (err) { return res.status(400).json({ ok: false, err }); };
        if (!usersDelete) { return res.status(400).json({ ok: false, err: { menssaje: 'Users no encontrado' } }); };
        res.json({ ok: true, usuario: usersDelete });
        //let result = err ? res.status(400).json({ ok: false, err }) : res.status(200).json({ Ok: true, usuario: usersDelete });
        //return result;

    });
});


module.exports = app;