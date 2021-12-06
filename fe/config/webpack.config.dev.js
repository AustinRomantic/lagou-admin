const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    //模式
    mode: 'development',
    // 入口
    entry: "./src/app.js",
    // 出口
    output:  {
        path: path.resolve(__dirname, '../dev'),
        filename: 'app.js'
    },
    // webpack-dev-server 的配置
    devServer: {
        // 本地启动的根目录
        static: path.resolve(__dirname, '../dev'),
        port: 8083,
        proxy: {
           "/api": {
                target: 'http://localhost:3000'
            } 
        }     
    },
    // 插件
    plugins: [
        // 打包html/css/js 生成html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: 'index.html'
        }),
        // 拷贝libs资源
        new CopyWebpackPlugin({
            patterns: [
              { from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dev/public') }
            ]
        })
    ],
    // loaders
    module: {
        rules: [
            {
                test: /\.art$/,
                exclude: /node_modules/,
                loader: "art-template-loader"
            }, 
            {
                test: /\.(scss|css)$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
        ]
    }
}