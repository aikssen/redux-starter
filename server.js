const express = require('express');
const ejs = require('ejs');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const winston = require('winston');
const config = require('./webpack.config.dev');
const jwt = require('jsonwebtoken');

const app = express();
const templates = `${__dirname}/views`;
const assets = `${__dirname}/dist`;
const defaultPort = 4000;
const port = process.env.PORT || defaultPort;
const compiler = webpack(config);

// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
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

app.post('/auth/getToken', (req, res, next) => {
	winston.info(req.body);
	if (req.body.email === 'hello@test.com' && req.body.password === 'test') {
		res.status(200)
			.json({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8' });
	} else {
		res.sendStatus(403);
	}
});

app.get('/getData', (req, res) => {
	let token = req.headers['authorization'];
	winston.info('HEADERS', req.headers);
	if (!token) {
		res.sendStatus(401);
	} else {
		try {
			let decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key');
			res.status(200)
			.json({ data: 'Valid JWT found! This protected data was fetched from the server.' });
		} catch (ev) {
			res.sendStatus(401);
		}
	}
});

app.get('/*', (req, res, next) => {
	res.render('index.html');
});

// app.get('*', (req, res) => {
// 	res.sendFile( `${__dirname}/views/index.html`);
// });

app.listen(port, () => {
	winston.info( `Server Running in port ${port}`);
});
