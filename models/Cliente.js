const mongoose = require('mongoose');

const ClientesSchema = mongoose.Schema({

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
    empresa: {
        type: String,
        required: true,
        trim: true //Elimina espacios en blanco al inicio y final
    },
    email: {
        type: String,
        required: true,
        trim: true, //Elimina espacios en blanco al inicio y final
        unique: true
    },
    telefono: {
        type: String,
        trim: true //Elimina espacios en blanco al inicio y final
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
})

module.exports = mongoose.model('Cliente', ClientesSchema);