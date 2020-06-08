const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();


app.put('/upload', function(req, res) {

    if (!req.file) {
        return res.status(400).json({
            ok: false,
            err: { message: 'No se ha seleccionado ningun archivo' }
        });
    }

    let archivo = req.files.archivo;
    let extencionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    let nombreImg = archivo.name.split('.');
    let extension = nombreImg[nombreImg.length - 1];

    if (extencionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `Las extencionse permitidas son ${extencionesValidas}`
            }
        })
    }
    archivo.mv(`uploads/${archivo.name}.${extension}`, (err) => {
        if (err) {
            res.status(500).json({ ok: false, err });
        }

        res.status(200).json({
            ok: true,
            err: {
                message: 'Imagen Subida Correctamente'
            }
        });
    });

});


module.exports = app;