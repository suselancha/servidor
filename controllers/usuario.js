const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const subirImagen = require('../utils/subir-imagen');
const fs = require('fs');
const path = require('path');

function createToken(usuario, SECRET_KEY, expiresIn) {
    const {id, nombre, correo, nombreUsuario, rol } = usuario;
    const payload = {
        id,
        nombre,
        correo,
        nombreUsuario,
        rol
    };

    return jwt.sign(payload, SECRET_KEY, { expiresIn });

}

async function nuevoUsuario(input) {
    /*console.log("Registrando usuario");
            console.log(input);
            return null
            return input;*/

            // Asigamos los input obtenidos
            const newUsuario = input;

            // Seteamos el correo a minuscula
            newUsuario.correo = newUsuario.correo.toLowerCase();
            //console.log(newUsuario);
            
            // Destructuramos el input del newUsuario
            const {correo, clave, nombreUsuario} =  newUsuario; 
            
            // Revisamos si el correo esta registrado
            const foundCorreo = await Usuario.findOne({correo});
            //console.log(foundCorreo); // Devuelve null si no lo encuentra
            if(foundCorreo) throw new Error("El correo ya esta registrado");
            
            // Revisamos si el nombre de usuario esta registrado
            const foundNombreUsuario = await Usuario.findOne({nombreUsuario});
            //console.log(foundNombreUsuario); // Devuelve null si no lo encuentra
            if(foundNombreUsuario) throw new Error("El nombre de usuario ya esta en uso");

            // Encriptar
            const salt = bcryptjs.genSaltSync(10);
            input.clave = bcryptjs.hashSync(clave, salt);

            try {
                const usuario = new Usuario(newUsuario);
                usuario.save();
                return usuario;
            } catch (error) {
                console.log(error)
            }
}

async function autenticarUsuario(input) {
    const { correo, clave } = input;
    /*console.log("Correo: " + correo);
    console.log("Clave: " + clave);*/

    // Revisamos si el correo esta registrado
    const foundUsuario = await Usuario.findOne({correo: correo.toLowerCase()});
    //console.log(foundCorreo); // Devuelve null si no lo encuentra
    if(!foundUsuario) throw new Error("Error en el correo o clave");

    // Comparamos la clave
    const claveExitoso = await bcryptjs.compare(clave, foundUsuario.clave);
    if(!claveExitoso) throw new Error("Error en el correo o clave");

    // Devuelve el token, verificar en : jwt.io
    // iat: fecha de creacion - exp: fecha de expiracion
    //console.log(createToken(foundUsuario, process.env.SECRET_KEY, "24h"));

    return {
        token: createToken(foundUsuario, process.env.SECRET_KEY, "24h")
    };
}

async function obtenerUsuario(id, nombreUsuario) {
    let usuario = null;
    if(id) usuario = await Usuario.findById(id);
    if(nombreUsuario) usuario = await Usuario.findOne({nombreUsuario});
    
    if(!usuario) throw new Error("El usuario no existe");

    return usuario;
}

async function actualizarAvatar(file, ctx) {
    //console.log(ctx);
    const { id } = ctx.usuario;
    //console.log(file);
    const { createReadStream, mimetype} = await file;
    const extension = mimetype.split("/")[1];
    //console.log(extension);
    const filename = `${id}.${extension}`;
    //console.log(imageName);
    const fileStream = createReadStream()
    //console.log(fileStream);

    try {
        const resultado = fileStream.pipe(fs.createWriteStream(`./uploads/avatar/${filename}`));
        return {
            estado: true,
            urlAvatar: resultado.path
        };
    } catch (error) {
        return {
            estado: false,
            urlAvatar: null
        };
    }
    
    //return null;
}

module.exports = {
    nuevoUsuario,
    autenticarUsuario,
    obtenerUsuario,
    actualizarAvatar
}