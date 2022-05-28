const path = require('path');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    app: ['./index.js']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.js'
  },
  // externals: [nodeExternals()],
};