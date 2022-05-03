const { common } = require('./config.common');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  ...common,
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      minify: true,
      filename: './index.html',
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './assets/styles/[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: true }),
      new CssMinimizerPlugin(),
    ]
  }
};
