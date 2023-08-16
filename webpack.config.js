const path = require('path'); //node의 path 모듈을 사용한다.
const MyWebpackPlugin = require('./my-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('./dist'), //path 모듈로 절대경로를 사용한다.
        filename: '[name].js' //entry에서 설정한 이름으로 동적할당 된다. 여기서는 main.js로 생성된다.
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: path.resolve('./my-webpack-loader.js')
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    publicPath: './dist/',
                    name: '[name].[ext]?[hash]',
                    limit: 20000, //2kb
                }
            }
        ]
    },
    plugins: [
       new MyWebpackPlugin()
    ]
}