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

    // 注意 jquery$ 的名字 要和 ProvidePlugin 插件中配置的名称（jquery）保持一致
    resolve: {
        alias: {
            jquery$: path.resolve(__dirname,'src/libs/jquery.min.js')
        }
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ]
}