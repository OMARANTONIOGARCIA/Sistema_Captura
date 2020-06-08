const express = require('express');
const _ = require('underscore');
const Alumno = require('../models/modelsEstudiante');

const { VerificacionToken } = require('../middlewares/autenticacion');
const app = express();


//=====================================
// Rutas de Estudiantes
//=====================================



//=====================================
// Mostrar Estudiante
//=====================================
app.get('/students', (req, res) => {

    let pag = req.query.pag || 0;
    pag = Number(pag);
    let limite = req.query.limite || 15;
    limite = Number(limite);

    Alumno.find({ estado: true }, '_id nombre apeMaterno apePaterno grado img')
        .skip(pag).limit(limite).exec((err, alumno) => {

            if (err) { return res.status(400).json({ ok: false, err }) }

            Alumno.count({ estado: true }, (err, conteo) => {

                if (err) { return res.status(400).json({ ok: false, err }); }

                res.status(200).json({ ok: true, users: alumno, count: conteo });

            });

        });
});

//=====================================
// Mostrar Estudiante Id
//=====================================
app.get('students/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(bod.req, ['nombre', 'apeMaterno', 'apePaterno', 'grado', 'img']);

    Alumno.findById(id, body, { new: true, runValidators: true }, (err, AlumnoDB) => {
        if (err) { return res.status(400).json({ ok: false, err }); }
        res.status(200).json({ ok: true, Alumno: AlumnoDB, err })
    })
});

//=====================================
// Registrar Estudiante
//=====================================

app.post('/students', (req, res) => {

    let body = req.body;

    let alumno = new Alumno({
        nombre: body.nombre,
        apeMaterno: body.apeMaterno,
        apePaterno: body.apePaterno,
        grado: body.grado,
        img: body.img
            //usuario: req.usuario
    })

    alumno.save((err, alumnoDB) => {

        if (err) {
            return res.status(400).json({ ok: false, err });
        }

        res.status(200).json({ ok: true, alumno: alumnoDB });

    });

});


//=====================================
// Eliminar Estudiante Id
//=====================================
app.delete('/students/:id', (req, res) => {

    let id = req.params.id;
    let cambioEstado = { estado: false };

    Alumno.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, alumnoDelete) => {

        if (err) { return res.status(400).json({ ok: false, err }); };
        if (!alumnoDelete) { return res.status(400).json({ ok: false, err: { message: 'Users no encontrado' } }); };
        res.json({ ok: true, alumno: alumnoDelete });


    });
});



//=====================================
// Editar Estudiante Id
//=====================================
app.put('/students/:id', VerificacionToken, (req, res) => {

    let id = req.params.id
    let body = _.pick(bod.req, ['nombre', 'apeMaterno', 'apePaterno', 'grado', 'img']);

    Alumno.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, alumnoDB) => {
        if (err) { return res.status(400).json({ ok: false, err }); }
        res.status(200).json({ ok: true, alumno: alumnoDB })
    })
});


module.exports = app;