const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    menssage: '{VALUE} no es rol valido'
};

let usuarioShema = new Schema({
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
    email: {
        type: String,
        unique: true,
        require: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        require: [true, 'El password es requerido']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
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


usuarioShema.plugin(uniqueValidator, {
    menssage: '{PATH} debe ser único'
});

module.exports = mongoose.model('Usuario', usuarioShema);