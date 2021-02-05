// Servidor Apollo
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
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
    //1- Playground enviar via HTTP HEADERS -> { "pepe": "HOLA"}
    //2- Verificar si llega en el server -> context: (headers) => {.. console.log(headers)
    //3- Destructruing -> context: ({req}) => {.. console.log(req.headers)
    //4- Enviar x Playground "authorization": "valor_token"
    context: ({ req }) => {
        //console.log(req.headers.authorization);
        const token = req.headers.authorization;
        if(token) {
            try {
                const usuario = jwt.verify(
                    token.replace("Bearer ", ""),
                    process.env.SECRET_KEY
                );
                return {
                    usuario
                };
            } catch (error) {
                //El error se da porque el token vencio o es invalido
                console.log("#### ERROR ####")
                console.log(error);
                throw new Error('Token inválido');
            }
        }
    }
});

const app = express();
server.applyMiddleware({app});
app.use(express.static('public'));
app.use(cors());

// Arrancar el servidor
/*server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
})*/

app.listen({ port:4000}, () => {
    console.log(`Servidor listo en htpp://localhost:4000`);
})