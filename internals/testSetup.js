// this file is not transpiled, must use CommonJS and ES5

// register babel to transpile before out tests run
require('babel-register')();

// disable webpack features that mocha doesn't understand
require.extensions['.css'] = function() {};
