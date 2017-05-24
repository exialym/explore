var path = require('path');
module.exports = {
  entry: './src/app.js',
  devtool: 'sourcemap',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0&plugins[]=transform-object-rest-spread&plugins[]=transform-decorators-legacy' }
    ]
  }
};
