// webpack.config.js

const path = require('path');
const webpack = require('webpack');

// 接收运行参数
const argv = require('yargs')
    .describe('debug', 'debug 环境') // use 'webpack --debug'
    .argv;

module.exports = {
    entry: {
        'jr-image': './index.js',
        '../test/public/jr-image': './index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        libraryTarget: 'umd', // 模块采用UMD格式打包
        library: 'jrImage' // 模块名称
    },
    plugins: [
        // 全局变量，一定要用JSON.stringify()包起来
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse(!!argv.debug || 'false'))
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.js$/, loader: 'babel-loader',
                exclude: /(node_modules)/
            }
        ]
    }
};