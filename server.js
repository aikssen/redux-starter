// system imports
const fs = require('fs');
// server imports
const express = require('express');
const http = require('http');
const https = require('https');
const io = require('socket.io');

const ejs = require('ejs');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const config = require('./webpack.config.dev');
// debug imports
const morgan = require('morgan');
const winston = require('winston');
// security imports
// const jwt = require('jsonwebtoken');

const app = express();
const templates = `${__dirname}/views`;
const assets = `${__dirname}/dist`;
const defaultPort = 4001;
const securePort = 4002;
const port = process.env.PORT || defaultPort;
const compiler = webpack(config);

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('dev'));

app.set('views', templates);
app.engine('html', ejs.renderFile);

//https://webpack.github.io/docs/webpack-dev-middleware.html
//https://webpack.github.io/docs/node.js-api.html
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo:     true,
	stats:      { colors: true, chunks: false },
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// assets files
app.use('/dist', express.static(assets));

app.get('/*', (req, res, next) => {
	res.render('index.html');
});

// app.listen(port, () => {
// 	winston.info( `Server Running in port ${port}`);
// });

const options = {
  key: fs.readFileSync('ssl/key.pem'),
  ca: fs.readFileSync('ssl/csr.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};


// normal HTTP server
http.createServer(app).listen(port, () => {
	winston.info( `Server Running in http://localhost:${port}/`);
});

// secure server over SSL
const server = https.createServer(options, app);

server.listen(securePort, () => {
	winston.info( `Server Running in https://localhost:${securePort}/`);
});

// const ws = io.connect(`https://localhost:${securePort}/`, { secure: true });
const ws = io.listen(server);
// ws.listen(server);

ws.on('connection', (socket) => {
  winston.info('a user connected');

	socket.on('chat message', (msg) => {
    ws.emit('chat message', msg);
  });

	socket.on('disconnect', () => {
		winston.info('user disconnected');
	});
});


