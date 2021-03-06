const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const address = require('address');
const { projectPath, outputPath, CopyShareImg } = require('./bz.config');

/**
 * 获取 ip
 */
const getAddressIP = () => {
  const ip = address.ip();
  if (/192(\.[0-9]{1,3}){3}/.test(ip)) return ip;
  return address.ip('以太网') || ip;
};

module.exports = {
  entry: {
    main: './src/index',
  },
  output: {
    path: outputPath,
    publicPath: process.env.NODE_ENV === 'production' ? projectPath : undefined,
    filename:
      process.env.NODE_ENV === 'production'
        ? '[name].js?[chunkhash]'
        : '[name].js',
    chunkFilename: '[id].js?[chunkhash]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.[(png)|(obj)|(json)]$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'imanges/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff',
          },
        },
      },
      {{#if less}}
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          { loader: 'css-loader', options: { sourceMap: false } },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
            },
          },
        ],
      },
      {{/if}}
    ],
  },
  performance: {
    hints: false,
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: getAddressIP() || '0.0.0.0',
    port: 8000,
    disableHostCheck: true,
  },
  plugins: [],
  resolve: {
    alias: {},
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};

if (process.env.NODE_ENV !== 'production') {
  module.exports.mode = 'development';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      bzConfigPath: 'https://source.office.bzdev.net/common/js/config.js',
      nodeEnv: process.env.NODE_ENV,
      inject: false,
      projectPath,
    }),
  ]);
} else {
  module.exports.mode = 'production';
  module.exports.devtool = false;
  module.exports.optimization = {
    minimize: false,
  };
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      nodeEnv: process.env.NODE_ENV,
      inject: false,
      projectPath,
      bzConfigPath: 'https://source.bozhong.com/common/js/config.js',
    }),
    new CopyShareImg(),
  ]);
}
