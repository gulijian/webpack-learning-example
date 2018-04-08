var path = require('path')

module.exports = {
    entry: {
        'app': './src/app.js'
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        publicPath: './dist/',
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,  // 启用压缩
                            modules: true    // 启用 css module
                        }
                    }
                ]
            }
        ]
    }
}