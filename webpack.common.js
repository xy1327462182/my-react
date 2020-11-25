// webpack.common.js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    entry: { //对象写法指定需要打包的入口文件
        //chunk名称:入口文件路径
        'index':'./src/index.js'
    },
    output: {
        filename: '[name]-[chunkhash].bundle.js',//指定打包后的文件名称,不用带路径
        publicPath: '/',//指定输出参考根路径
        path: path.resolve(__dirname, 'dist')//指定打包后文件的存放位置,用绝对路径
    },
    module:{
        //配置loader
        rules: [
            // 处理css的loader
            {
                test: /\.css$/,
                use:[
                    //'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        }
                    },
                    'css-loader'
                ]
            },
            //处理图片 
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 //当图片大小超过limit值后,会生成一个文件,否则生成Data URL
                        }
                    }
                ]
            },
            //babel处理ES6
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }           
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template: './src/index.html',//模板文件
            filename: 'index.html',//输出的文件名
            //inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
            hash: true,//给生成的文件添加一个唯一的hash
            chunks: ['index']//需要包含的入口中的chunk
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].[fullhash].css'//使用模版指定输出的css文件的位置和文件名称,模版和出口的模版一致
        }),
        new CleanWebpackPlugin()
    ]
};