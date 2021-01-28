const { mergeTypeDefs } = require('@graphql-tools/merge');
const clienteType = require('./clienteType');
const usuarioType = require('./usuarioType');

const types = [
    clienteType,
    usuarioType
];

module.exports = mergeTypeDefs(types);