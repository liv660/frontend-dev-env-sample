const path = require('path'); //node의 path 모듈을 사용한다.
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    stats: 'errors-only',
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('./dist'), //path 모듈로 절대경로를 사용한다.
        filename: '[name].js' //entry에서 설정한 이름으로 동적할당 된다. 여기서는 main.js로 생성된다.
    },
    devServer: {
        //hot: true, //hot module replacement 기능 사용, webpack-dev-server 버전 4이상부터는 default 값이 true이다.
        client: {
            overlay: true,
        },
        //mockup api 사용하기
        setupMiddlewares: (middlewares, devServer) => {
            middlewares.unshift({
				name: 'first',
				path: '/api/users', //mockup api
				middleware: (req, res) => {
					res.send([
						{id: 1, name: 'Alice'},
						{id: 2, name: 'Bek'},
						{id: 3, name: 'Chris'}
					])
				}
			});
			return middlewares;
        },
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: path.resolve('./my-webpack-loader.js')
            // },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
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
        new webpack.BannerPlugin({
            banner: `
                Build Date: ${new Date().toLocaleDateString()},
                Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')},
                Author: ${childProcess.execSync('git config user.name')}
            `
        }),
        new webpack.DefinePlugin({
            TWO: '1+1',
            'api.domain': JSON.stringify('http://dev.api.domain.com')
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: {
                env: process.env.NODE_ENV === 'development' ? '( )' : ''
            },
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true,
                removeComments: true
            } : false
        }),
        new CleanWebpackPlugin(),
        ...(process.env.NODE_ENV === 'production'
            ? [new MiniCssExtractPlugin({filename: '[name].css'})]
            : []
        )
    ]
}