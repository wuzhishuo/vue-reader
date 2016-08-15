module.exports = {
    entry: './src/main.js',
    output: {
        path: './bundle',
        filename: 'bundle.js'
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
      }
        ]
    }
}