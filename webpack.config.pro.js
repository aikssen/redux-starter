var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry:	 [
		'./src/js/App.jsx',
		'./src/styles/importer.scss'
	],
	resolve: { // allow to import .jsx into components
		extensions: ['', '.js', '.jsx', '.scss']
	},
	output: {
		path:				path.join(__dirname, '/dist/js/'),
		filename:		'bundle.min.js',
		publicPath: '/dist/js/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new ExtractTextPlugin('../css/styles.min.css'),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin({ //for production
			mangle: false,
			minimize: true, //css and js
			compressor: { warnings: false } //true
		})
	],
	module:	{
		loaders: [
			{ //compiles react es7
				test:		/\.jsx$/,
				loader: ['babel'],
				query:	{
					//plugins: ['transform-decorators-legacy'],
					presets: ['latest', 'stage-1', 'react']
				}
			},
			{ //compiles sass
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('raw!sass')
			}
		]
	}
};
