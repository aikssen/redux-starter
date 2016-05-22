var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');


var templates = __dirname + '/views';
var assets = __dirname + '/dist';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(morgan('dev'));

// app.set('views', __dirname + '/../templates');
app.set('views', templates);
app.engine('html', ejs.renderFile);

// assets files
app.use('/dist', express.static(assets));

app.get('/', function(req, res, next){
	res.render('index.html');
});

app.listen(4000, function() {
	console.log('Server Running in port 4000');
});
