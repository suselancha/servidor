const Cliente = require('../models/Cliente');

async function nuevoCliente(input, ctx) {
            //Verifico por consola si llegan los datos
            /*console.log(input);
            console.log(ctx);*/

            // Asigamos los input obtenidos
            const newCliente = input;

            // Seteamos el email a minuscula
            newCliente.email = newCliente.email.toLowerCase();
            //console.log(newUsuario);
            
            // Destructuramos el input del newCliente
            const { email } =  newCliente; 
            
            // Revisamos si el correo esta registrado
            const foundEmail = await Cliente.findOne({email});
            //console.log(foundCorreo); // Devuelve null si no lo encuentra
            if(foundEmail) throw new Error("El cliente ya esta registrado");

            // Asignar vendedor
            newCliente.vendedor = ctx.usuario.id;

            //Guarda en la base de datoas
            try {
                const cliente = new Cliente(newCliente);
                cliente.save();
                return cliente;
            } catch (error) {
                console.log(error)
            }
            
}

async function obtenerClientes() {
    try {
        const clientes = await Cliente.find({});
        return clientes;
    } catch (error) {
        console.log(error);
    }
}

async function obtenerClientesVendedor(ctx) {
    //console.log(ctx.usuario);
    try {
        const clientes = await Cliente.find({ vendedor: ctx.usuario.id.toString() })
        return clientes;
    } catch (error) {
        console.log(error);
    }
}

async function obtenerCliente(id, ctx) {
    //Revisar si existe el cliente
    const cliente = await Cliente.findById(id);
    
    if(!cliente) throw new Error("Cliente no encontrado");

    //Quien lo creo puede verlo
    if(cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("No tienes permisos");
    }

    return cliente;
}


module.exports = {
    nuevoCliente,
    obtenerClientes,
    obtenerClientesVendedor,
    obtenerCliente
}