const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let grupos = {
    values: ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'],
    menssage: '{VALUES} grados o grupos no validos'
};
let alumnoShema = new Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    apeMaterno: {
        type: String,
        require: [true, 'El Apellido Materno es requerido']
    },
    apePaterno: {
        type: String,
        require: [true, 'El Apellido Paterno es requerido']
    },
    grados: {
        type: String,
        require: [true, 'El grado es requerido'],
        enum: grupos
    },
    img: {
        type: String,
        require: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    fechaupdate: {
        type: Date,
        default: new Date()
    },
});


alumnoShema.plugin(uniqueValidator, {
    menssage: '{PATH} debe ser único'
});

module.exports = mongoose.model('Alumno', alumnoShema);