const Cliente = require('../../models/Cliente');
require('dotenv').config({ path: 'variables.env' });

const resolvers = {
    Query : {
        obtenerClientes: async() => {
            try {
                const clientes= await Cliente.find();
                return clientes;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerClientesVendedor: async(_, {}, ctx) => {
            if(!ctx.usuario) return null;
            console.log('CTXXXXX: ' + ctx.usuario);
            try {
                const clientes= await Cliente.find({vendedor: ctx.usuario.id.toString()});
                return clientes;
            } catch (error) {
                console.log('RESOLVER ERROR: ' + error);
            }
        }
    },
    Mutation: {
        nuevoCliente: async (_, { input }, ctx) => {
            //Verifico por consola si llegan los datos
            //console.log(input);
            //console.log(ctx);

            const { email } = input;
            const cliente = await Cliente.findOne({email});
            if (cliente) {
                throw new Error('Cliente ya registrado');
            }

            const nuevoCliente = new Cliente(input);

            // Asignar vendedor
            nuevoCliente.vendedor = ctx.usuario.id;

            // Guardar en base de datos
            try {
                const resultado = await nuevoCliente.save();
                return resultado;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;