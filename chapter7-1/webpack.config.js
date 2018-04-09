var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'app': './src/app.js',
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].bundle.js'
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}