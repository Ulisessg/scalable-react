const { join } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const file = process.env.FILE;
const path = join(__dirname, 'src', 'react', 'pages', file);

module.exports = {
  mode: 'production',
  entry: {
    [file]: path,
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: 'js/[name].[fullhash].js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxSize: 1200,
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /\/node_modules/,
        terserOptions: {
          ecma: 2015,
        },
      }),
      new OptimizeCSSAssetsPlugin(),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /\/node_modules/,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        // eslint-disable-next-line global-require
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|gif|jpg|svg|eot|ttf|woff|woff2|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/[fullhash].[ext]',
            limit: 9000,
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[fullhash].css',
      chunkFilename: 'css/[id].[fullhash].css',
    }),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'public', file.split('.')[0].concat('.html')),
      filename: join(__dirname, 'dist', file.split('.')[0].concat('.html')),
      chunks: [file],
      scriptLoading: 'defer',
    }),
  ],
};
