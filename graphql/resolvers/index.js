const { mergeResolvers } = require('@graphql-tools/merge');
const clienteResolver = require('./clienteResolver');
const usuarioResolver = require('./usuarioResolver');

const resolvers = [
    clienteResolver,
    usuarioResolver
];

module.exports = mergeResolvers(resolvers);