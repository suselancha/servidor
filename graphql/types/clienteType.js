
const { gql } = require('apollo-server');

const typeDefs = gql`

    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        vendedor: ID
    }

    input ClienteInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

    type Query {
        obtenerClientes: [Cliente]
        obtenerCliente(id: ID!): Cliente
        obtenerClientesVendedor: [Cliente]
    }

    type Mutation {
        nuevoCliente(input: ClienteInput): Cliente
    }

`;

module.exports = typeDefs;