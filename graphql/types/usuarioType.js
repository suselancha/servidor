
const { gql } = require('apollo-server');

const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        correo: String
        clave: String
        nombreUsuario: String
        rol: Rol
        activo: Boolean
        creado: String
        sitioWeb: String
        avatar: String
        descripcion: String
    }

    type Token {
        token: String
    }

    type ActualizarAvatar {
        estado: Boolean,
        urlAvatar: String
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        correo: String!
        clave: String!
        nombreUsuario: String!
        rol: Rol
        activo: Boolean
    }

    input AutenticarInput {
        correo: String!
        clave: String!
    }

    enum Rol {
        ADMINISTRADOR
        INVITADO
    }    

    type Query {
        obtenerUsuarios: [Usuario]
        obtenerUsuario(id: ID, nombreUsuario: String): Usuario
    }

    type Mutation {
        nuevoUsuario(input: UsuarioInput):  Usuario
        autenticarUsuario(input: AutenticarInput): Token
        actualizarAvatar(file: Upload): ActualizarAvatar
        eliminarAvatar: Boolean
    }
`;

module.exports = typeDefs;