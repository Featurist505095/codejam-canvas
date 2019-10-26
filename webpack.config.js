const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {head: './src/app.js', body: './src/script/script.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.exec\.js$/,
        use: [ 
          {
            loader: 'script-loader',
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      },
      {
        test: /.html$/,
        use: [
          "extract-loader",
          {
            loader: "html-loader",
            options: {
              attrs: "img:src"
            }
          },
          "ejs-loader"
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },        
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new CopyPlugin([
      { from: 'src/data', to: 'data' },
    ]),
  ]
};