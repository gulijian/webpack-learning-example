var path = require('path')

module.exports = {

    entry: {
        'app': './src/app.js',
    },

    output: {
        path: path.resolve(__dirname,'./dist/'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 30000
                        }
                    }
                ]
            }
        ]
    }
}