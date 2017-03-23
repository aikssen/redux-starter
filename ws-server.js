// system imports
const fs = require('fs');
// server imports
const express = require('express');
const https = require('https');
const io = require('socket.io');
// debug imports
const winston = require('winston');
// security imports
// const jwt = require('jsonwebtoken');

const app = express();
const defaultPort = 4003;

app.get('/*', (req, res, next) => {
  res.send('Websockets server');
});


const options = {
  key: fs.readFileSync('ssl/key.pem'),
  ca: fs.readFileSync('ssl/csr.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};

// secure server over SSL
const server = https.createServer(options, app);

server.listen(defaultPort, () => {
	winston.info( `Server Running in https://localhost:${defaultPort}/`);
});

const ws = io.listen(server);

ws.on('connection', (socket) => {
  winston.info('a user connected');

	socket.on('chat message', (msg) => {
    console.log('message: ', msg);
    ws.emit('chat message', msg);
  });

	socket.on('disconnect', () => {
		winston.info('user disconnected');
	});
});


