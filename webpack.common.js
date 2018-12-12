const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
//const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    // output: {
    //     filename: '[name].[hash].bundle.js',
    //     path: path.resolve(__dirname, 'BI_portal'),
    //     publicPath: '/fbi/BI_portal/' // '/' dev    '/fbi/BI_portal/' 构建
    //     //publicPath: '/'
    // },
    // module: {
    //     rules: [
    //       {
    //         test: /\.css$/,
    //         //loader: 'style-loader!css-loader?modules&minimize'
    //         use: [
    //           'style-loader',
    //           'css-loader'//开启css modules
    //         ]
    //       },
    //       {
    //         test: /\.scss$/,
    //         //loader: 'style-loader!css-loader?modules&minimize'
    //         use: [
    //           'style-loader',
    //           'css-loader',
    //           'sass-loader'//需要装node-sass sass-loader
    //         ]
    //       },
    //       // {
    //       //   test: /\.(png|svg|jpg|gif)$/,
    //       //   use: [
    //       //     'file-loader'
    //       //   ]
    //       // },
    //       {
    //         test: /\.(png|jpg|gif)$/,  //图片小文件处理成 dataURl 减少http请求，大文件hash引入
    //         use: [
    //           {
    //             loader: 'url-loader',//url-loader已包含file-loader，不需要再调用file-loader
    //             options: {
    //               limit: '10000',
    //               fallback: 'file-loader'
    //             }
    //           }
    //         ]
    //       },
    //       {
    //         test: /\.(html)$/,
    //         use: {
    //           loader: 'html-loader',
    //           options: {
    //             attrs: ['img:src']
    //           }
    //         }
    //       }
    //     ]
    //   }
}