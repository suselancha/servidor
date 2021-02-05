require('dotenv').config({ path: 'variables.env' });

const usuarioController = require('../../controllers/usuario');

const resolvers = {
    Query : {
        // Se ejecuta si hay un token valido
        obtenerUsuario: (_, { id, nombreUsuario }) => usuarioController.obtenerUsuario(id, nombreUsuario),
    },

    Mutation: {
        nuevoUsuario: (_, { input }) => usuarioController.nuevoUsuario(input),
        autenticarUsuario: (_, { input }) => usuarioController.autenticarUsuario(input),
        actualizarAvatar: (_, { file }, ctx) => usuarioController.actualizarAvatar(file, ctx),
        eliminarAvatar: (_, {}, ctx) => usuarioController.eliminarAvatar(ctx),
    }
}

module.exports = resolvers;