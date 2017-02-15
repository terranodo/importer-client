var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
webpackConfig.plugins.push(new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('test') } }));
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    files: [
      'node_modules/whatwg-fetch/fetch.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'tests/tests.bundle.js',
      { pattern: 'src/**/*', watched: false, included: false, served: true, nocache: true }
    ],
    preprocessors: {
      'tests/tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },
    frameworks: ['intl-shim', 'mocha', 'chai'],
    reporters: [ 'mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    autoWatch: false,
		coverageReporter: {
      dir: 'reports',
      reporters:[
        {type: 'html', subdir: 'html/'},
        {type: 'lcovonly', subdir: 'coverage/', file: 'lcov.info'},
      ]
    }
  });
};
