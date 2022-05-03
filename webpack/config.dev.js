const { common } = require('./config.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const mockAPI = require('connect-api-mocker');

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 8081,
    open: true,
    onBeforeSetupMiddleware: (devServer) => {
      if (!devServer) { throw new Error('webpack-dev-server is not defined'); }
      devServer.app.use(mockAPI('/api/questions/', '/mocks/questions'));
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: './index.html',
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './assets/styles/[name].css',
    }),
    new Dotenv()
  ],
};
