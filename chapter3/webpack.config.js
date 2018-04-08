var webpack = require('webpack')

var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash']
    },

    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'

    },

    plugins: [

        /**
         * 第一步
         * 
         * vendor.bundle.js
         * 
         * 提取 webpack 和 lodash 和 业务代码 (subpageA,subpageB,moduleA) 
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            miniChunks: Infinity
        }),

        /**
         * 第二步
         * 
         * vendor.bundle.js
         * 
         * 提取 webpack 代码 (基于第一步)
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            miniChunks: Infinity
        }),


         /**
          * 第三步
          * 
          * common.bundle.js
          * 
          * 提取  pageA 和 pageB 的公共代码 (subpageA,subpageB,moduleA) (基于第一步和第二步)
          */
         new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            miniChunks: 2,
            chunks: ['pageA','pageB']
        })


    ]
}