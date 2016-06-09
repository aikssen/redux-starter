var path = require('path');
var webpack = require('webpack');

module.exports = {
	// watch:	 true,
	devtool: 'source-map',
	entry:	 [
		'webpack-hot-middleware/client',
		'./src/js/App.jsx',
		'./src/styles/importer.scss'
	],
	resolve: { // allow to import .jsx into components
		extensions: ['', '.js', '.jsx', '.scss']
	},
	output: {
		path:			  path.join(__dirname, '/dist/js/'),
		filename:	  'bundle.js',
		publicPath: '/dist/js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'APP_ENV': JSON.stringify(process.env.APP_ENV)
			}
		}),
	],
	module:	{
		preLoaders: [{ //linting
			test:	  /\.jsx$/,
			exclude: /(node_modules|bower_components)/,
			loaders: ['eslint-loader']
		}],
		loaders: [
			{ //compiles react es7
				test:	  /\.jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query:	{
					plugins: ['transform-decorators-legacy'],
					presets: ['es2016', 'stage-1', 'react']
				}
			},
			{ //compiles sass
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader',
				pathinfo: false
		  }
		]
	}
};
