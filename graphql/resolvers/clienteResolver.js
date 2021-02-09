
const clienteController = require('../../controllers/cliente');

const resolvers = {
    Query : {
        // Se ejecuta si hay un token valido
        obtenerClientes: () => clienteController.obtenerClientes(),
        obtenerClientesVendedor: (_, {}, ctx) => clienteController.obtenerClientesVendedor(ctx),
        obtenerCliente: (id) => clienteController.obtenerCliente(id),
    },

    Mutation: {
        nuevoCliente: (_, { input }, ctx) => clienteController.nuevoCliente(input, ctx),
        
    }
}

module.exports = resolvers;