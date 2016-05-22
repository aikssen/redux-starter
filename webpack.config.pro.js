var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	// watch:	 true,
	entry:	 [
		'webpack-hot-middleware/client',
		'./src/js/App.jsx',
		'./src/styles/importer.scss'
	],
	resolve: { // allow to import .jsx into components
		extensions: ['', '.js', '.jsx', '.scss']
	},
	output: {
		path:				path.join(__dirname, '/dist/js/'),
		filename:		'bundle.js',
		publicPath: '/dist/js/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new ExtractTextPlugin('../css/styles.css'),
		new webpack.DefinePlugin({
			'process.env': {
				'APP_ENV': JSON.stringify(process.env.APP_ENV)
			}
		}),
		new webpack.optimize.UglifyJsPlugin({ //for production
			mangle: false,
			minimize: true,
			compressor: { warnings: false } //true
		})
	],
	module:	{
		loaders: [
			{ //compiles react es7
				test:		/\.jsx$/,
				loader: ['babel'],
				query:	{ presets: ['es2016', 'stage-1', 'react'] }
			},
			{ //compiles sass
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!sass')
			}
		]
	}
};
