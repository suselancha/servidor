const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true //Elimina espacios en blanco al inicio y final
    },
    apellido: {
        type: String,
        required: true,
        trim: true //Elimina espacios en blanco al inicio y final
    },
    correo: {
        type: String,
        required: true,
        trim: true, //Elimina espacios en blanco al inicio y final
        unique: true
    },
    clave: {
        type: String,
        required: true,
        trim: true //Elimina espacios en blanco al inicio y final
    },
    nombreUsuario: {
        type: String,
        required: true,
        trim: true //Elimina espacios en blanco al inicio y final
    },
    rol: {
        type: String,
        default: 'INVITADO'
    },
    activo: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String,
        trim: true
    },
    sitioWeb: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema);