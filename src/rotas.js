const express = require('express');
const assinantes = require('./controladores/assinantes')

const rotas = express();

rotas.post('/assinantes', assinantes.cadastrarAssinante);
rotas.post('/enviar', assinantes.enviarEmail);

module.exports = rotas;