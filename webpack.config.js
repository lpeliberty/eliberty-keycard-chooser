const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'dist/main.css',
});

module.exports = {
  entry: [
    './src/index'
  ],
  module: {
    loaders: [
      {
        test: /bootstrap.+\.(jsx|js)$/,
        loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window',
      },
      { test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.s[ca]ss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.*.svg$/,
        loader: 'svg-inline-loader',
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, loader: 'file-loader?limit=100000' }
    ],

  },
  resolve: {
    extensions: ['.js','.scss']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    extractSass
  ]
};
