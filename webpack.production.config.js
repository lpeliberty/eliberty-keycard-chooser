const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'main.css',
});

module.exports = {
  entry: [
    './src/index',
  ],
  module: {
    loaders: [
      {
        test: /\.(jpg|svg|png)$/,
        use: 'file-loader',
      },
      {
        test: /bootstrap.+\.(jsx|js)$/,
        loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window',
      },
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
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|legacyjs)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.*.svg$/,
        loader: 'svg-inline-loader',
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, loader: 'file-loader?limit=100000' }
    ],

  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [__dirname, 'app', 'node_modules'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'keycardChooser.js',
    library: "keycardChooser",
    libraryTarget: "var"
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    extractSass
  ]
};
