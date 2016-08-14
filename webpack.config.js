module.exports = {
    entry: './src/app.js',
    output: {
        path: './bundle',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}