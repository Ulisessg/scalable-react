const { join } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

const file = process.env.FILE;

console.log(file);

const path = join(__dirname, 'src', 'react', 'pages', file);

module.exports = {
  mode: 'development',
  entry: {
    [file]: path,
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: 'js/[name].[fullhash].js',
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|gif|jpg|svg|eot|ttf|woff|woff2|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/[hash].[ext]',
            limit: 9000,
          },
        },
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'public', file.split('.')[0].concat('.html')),
      filename: join(
        __dirname,
        'dist',
        process.env.FILE.split('.')[0].concat('.html'),
      ),
    }),
  ],
  devServer: {
    index: file.split('.')[0].concat('.html'),
    contentBase: join(__dirname, 'src', 'react', 'pages', file),
    watchContentBase: true,
    port: 2001,
    hot: true,
    open: true,
    watchOptions: {
      poll: 420,
    },
  },
};
