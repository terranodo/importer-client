var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
webpackConfig.plugins.push(new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('test') } }));
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    files: [
      'tests/tests.bundle.js',
      { pattern: 'src/**/*', watched: false, included: false, served: true, nocache: true }
    ],
    preprocessors: {
      'tests/tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },
    frameworks: ['mocha'],
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
