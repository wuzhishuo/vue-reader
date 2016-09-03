var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: ['whatwg-fetch','./src/main.js'],
    output: {
        path: 'dist',
        filename: '[hash]_bundle.js'
    },
    devtool: '#eval-source-map',
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        {
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      
        ]
    },
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
                secure: false,
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
    ],
  node: {
      fs: 'empty'
  }
}