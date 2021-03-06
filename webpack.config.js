var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, '.');

var plugins = [];
var filename = '[name].js';
var PROD = JSON.parse(process.env.BUILD_PROD || false);
if(PROD) {
  plugins.push(new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress:{ warnings: true } }));
  filename = '[name].min.js';
}


module.exports = {
	entry: {
    Importer: [APP_DIR + '/src/importer.js']
  },
	output: {
    path: BUILD_DIR,
    filename: filename,
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: "/dist/"
	},
  node: {fs: "empty"},
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
	module: {
		loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|gif|jpg|jpeg|svg|otf|ttf|eot|woff)$/, loader: 'file-loader' }
    ]
	}
};
