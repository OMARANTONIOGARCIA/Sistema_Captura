const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;


let padresShema = new Schema({
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
        required: [true, 'El Apellido Paterno es requerido']
    },
    img: {
        type: String,
        required: [true, 'La imagen es requerido']
    },
    estado: {
        type: Boolean,
        default: true
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Alumno',
        required: [true, 'El Alumno es requerido']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es requerido']
    },
    fechaupdate: {
        type: Date,
        default: new Date()
    }
});


padresShema.plugin(uniqueValidator, {
    menssage: '{PATH} debe ser único'
});

module.exports = mongoose.model('Padre', padresShema);
module.exports = mongoose.model('Padre', padresShema);