var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        'app': './src/app.js',
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].bundle.js'
    },

    plugins: [
       new CleanWebpackPlugin([
           'dist'
       ])
    ]
}