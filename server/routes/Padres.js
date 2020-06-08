const express = require('express');
const _ = require('underscore');
const Padre = require('../models/modelsPadres');

const { VerificacionToken } = require('../middlewares/autenticacion');
const app = express();


//=====================================
// Rutas de Estudiantes
//=====================================



//=====================================
// Mostrar Estudiante
//=====================================
app.get('/parents', (req, res) => {

    let pag = req.query.pag || 0;
    pag = Number(pag);
    let limite = req.query.limite || 15;
    limite = Number(limite);

    Padre.find({ estado: true }, '_id nombre apeMaterno apePaterno img')
        .skip(pag).limit(limite).exec((err, PadreDB) => {

            if (err) { return res.status(400).json({ ok: false, err }) }

            Padre.count({ estado: true }, (err, conteo) => {

                if (err) { return res.status(400).json({ ok: false, err }); }

                res.status(200).json({ ok: true, parents: PadreDB, count: conteo });

            });

        });
});

//=====================================
// Mostrar Estudiante Id
//=====================================
app.get('parents/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(bod.req, ['nombre', 'apeMaterno', 'apePaterno', 'img']);

    Padre.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, PadreDB) => {
        if (err) { return res.status(400).json({ ok: false, err }); }
        res.status(200).json({ ok: true, parents: PadreDB })
    })
});

//=====================================
// Registrar Estudiante Id
//=====================================

app.post('/parents', (req, res) => {

    let padre = new Padre({
        nombre: req.body.nombre,
        apeMaterno: req.body.apeMaterno,
        apePaterno: req.body.apePaterno,
        img: req.body.img,
        alumno: req.alumno._id,
        usuario: req.usuario._id

    })

    padre.save((err, PadreDB) => {
        let result = err ? res.status(400).json({ ok: false, message: 'Faltan datos', err }) : res.status(200).json({ Ok: true, parents: PadreDB });
        return result;
    });

});


//=====================================
// Eliminar Estudiante Id
//=====================================
app.delete('/parents/:id', (req, res) => {

    let id = req.params.id;
    let cambioEstado = { estado: false };

    Padre.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, PadreDelete) => {

        if (err) {
            return res.status(400).json({ ok: false, err });
        };

        if (!PadreDelete) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Users no encontrado' }
            });
        };

        res.json({ ok: true, parents: PadreDelete });

    });
});



//=====================================
// Editar Estudiante Id
//=====================================
app.put('/parents/:id', (req, res) => {

    let id = req.params.id
    let body = _.pick(bod.req, ['nombre', 'apeMaterno', 'apePaterno', 'img']);

    Padre.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, PadreDB) => {

        if (err) {
            return res.status(400).json({ ok: false, err });
        }

        res.status(200).json({ ok: true, parents: PadreDB })
    })
});


module.exports = app;