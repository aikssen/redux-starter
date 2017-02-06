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
		filename:	  'bundle.min.js',
		publicPath: '/dist/js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
	],
	module:	{
		preLoaders: [{ //linting
			test:	  /\.jsx$/,
			exclude: /(node_modules|vendor)/,
			loaders: ['eslint-loader']
		}],
		loaders: [
			{ //compiles react es7
				test:	  /\.jsx$/,
				exclude: /(node_modules|vendor)/,
				loader: 'babel',
				query:	{
					//plugins: ['transform-decorators-legacy'],
					presets: ['latest', 'stage-1', 'react']
				}
			},
			{ //compiles sass
				test: /\.scss$/,
				loader: 'style-loader!raw-loader!sass-loader',
				pathinfo: false
		  }
		]
	}
};
