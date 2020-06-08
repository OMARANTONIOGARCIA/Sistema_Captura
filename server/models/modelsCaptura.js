const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;


let capturaShema = new Schema({
    estado: {
        type: Boolean,
        default: true
    },
    fechaupdate: {
        type: Date,
        required: [true, 'El fecha es requerido']
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Alumno',
        required: [true, 'El alumno es requerido']
    },
    padre: {
        type: Schema.Types.ObjectId,
        ref: 'Padre',
        required: [true, 'El padre es requerido']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es requerido']
    },
});



module.exports = mongoose.model('Captura', capturaShema);