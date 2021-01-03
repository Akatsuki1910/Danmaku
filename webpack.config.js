const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MODE = "development";
// const MODE = "production";
const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  entry: "./src/index.js",
  output: {
    path: `${__dirname}/public`,
    filename: "main.js",
  },

  module: {
    rules: [{
      test: /\.scss/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
          options: {
            url: false,
            sourceMap: enabledSourceMap,
            importLoaders: 2,
          },
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: enabledSourceMap,
          },
        },
      ],
    }, {
      test: /\.html$/,
      loader: "html-loader"
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      loader: 'url-loader',
      options: {
        limit: 51200,
        name: './image.[name].[ext]'
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      }, ],
    }, {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
          ]
        }
      }]
    }],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html"
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      THREE: 'three',
      PIXI: 'pixi.js'
    })
  ],
  target: ["web", "es5"],
};