var express = require('express');
var ejs = require('ejs');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var config = require('./webpack.config.dev');

var app = express();
var templates = __dirname + '/views';
var assets = __dirname + '/dist';
var port = process.env.PORT || 4000;
var compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('dev'));

app.set('views', templates);
app.engine('html', ejs.renderFile);

//https://webpack.github.io/docs/webpack-dev-middleware.html
//https://webpack.github.io/docs/node.js-api.html
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
	stats: { colors: true, chunks: false },
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// assets files
app.use('/dist', express.static(assets));

// app.get('/', function(req, res, next){
// 	res.render('index.html');
// });

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, function() {
	console.log('Server Running in port '+ port);
});
