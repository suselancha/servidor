// Servidor Apollo
const { ApolloServer } = require('apollo-server');
// Schema
const typeDefs = require('./graphql/types');
// Resolvers
const resolvers = require('./graphql/resolvers');
// Conectar Mongo
const conectarDB = require('./config/db');
conectarDB();

require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');

// Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
});


// Arrancar el servidor
server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
})

