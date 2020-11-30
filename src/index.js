const http = require('http');
const express = require('express');
const app = require('./config/server');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio.listen(server);
require('dotenv').config();

// start the server

app.set('port', process.env.PORT);

server.listen(app.get('port'), () => {
    console.log('Servidor conectado al puerto ', app.get('port'));
});