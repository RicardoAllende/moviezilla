const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.html$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'html-loader',
      }
    ]
  },
  {
    test: /\.(s*)css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader'
    ]
  },
  {
    test: /\.(png|jpe?g|gif|svg)/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'assets/image/[contenthash].[ext]'
        }
      }
    ]
  },
];

const common = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@styles': path.resolve(__dirname, '../src/styles/'),
      '@components': path.resolve(__dirname, '../src/components/'),
      '@assets': path.resolve(__dirname, '../src/assets/'),
      '@store': path.resolve(__dirname, '../src/store/'),
    }
  },
  module: {
    rules: loaders
  },
};

module.exports = { common };
