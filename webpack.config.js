const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extractSass = new MiniCssExtractPlugin({
  filename: 'dist/main.css',
});

module.exports = {
  entry: [
    './src/index',
  ],
  module: {
    rules: [
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, loader: 'file-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [__dirname, 'app', 'node_modules'],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'keycardChooser.js',
    library: 'keycardChooser',
    libraryTarget: 'var',
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    extractSass,
  ],
};
