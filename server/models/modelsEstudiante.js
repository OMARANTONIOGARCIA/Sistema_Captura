const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let grupos = {
    values: ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'],
    menssage: '{VALUES} grados o grupos no validos'
};
let alumnoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apeMaterno: {
        type: String,
        required: [true, 'El Apellido Materno es requerido']
    },
    apePaterno: {
        type: String,
        require: [true, 'El Apellido Paterno es requerido']
    },
    grado: {
        type: String,
        enum: grupos,
        required: [true, 'El grado es requerido']
    },
    img: {
        type: String,
        required: false
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


module.exports = mongoose.model('Alumno', alumnoSchema);