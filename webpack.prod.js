const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');

const webpack = require('webpack');

let configs = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
   devtool: 'source-map',
   module: {
    rules: [
        {
            test: /\.css$/,
            loader:  ExtractTextPlugin.extract('css-loader')
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: '10000',
                  fallback: 'file-loader'
                }
              }
            ]
        },
        {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader',
                options: {
                attrs: ['img:src']
                }
            }
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [ 
                    //'style-loader', 
                    {
                        loader: "css-loader",
                        //options: { modules: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            //sourceMap: true, 
                            plugins: [require('autoprefixer')({browsers:['last 5 versions']}), require('cssnano')]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        //options: { sourceMap: true }
                    }
                ]
            })
        }
      ]
   },
   plugins: [

        new CleanWebpackPlugin(['./BI_portal']),
        new ExtractTextPlugin({
            filename: '[hash].css',//[name].[hash].css会有不同名称相同hash的文件打包出来，先单用hash来做
            allChunks: true
        }),
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            title: '全民BI',
            template: path.join(__dirname, 'index.html')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin(),
        
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, './src/images'),
        //         to: './dist',
        //         //ignore: ['.*']
        //     }
        // ])
        // new webpack.ProvidePlugin({
        //     _: 'lodash'
        // })
    ],
    optimization: {
        splitChunks: {
            // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
            chunks: "all",
            // 表示在压缩前的最小模块大小，默认为0；
            minSize: 30000,
            //表示被引用次数，默认为1
            minChunks: 1,
            //最大的按需(异步)加载次数，默认为1；
            maxAsyncRequests: 3,
            //最大的初始化加载次数，默认为1；
            maxInitialRequests: 3,
            // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
            name: true,
            //缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
            //runtimeChunk: 'single',
            cacheGroups: {
                //缓存组信息，名称可以自己定义
                commons: {
                    //拆分出来块的名字,默认是缓存组名称+"~" + [name].js
                    name: "commons",
                    // 同上
                    minChunks: 3,
                    // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
                    enforce: true,
                    //test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
                    // test: ""
                },
                //设置多个缓存规则
                vendor: {
                    test: /node_modules/,
                    name: "vendor",
                    //表示缓存的优先级
                    priority: 10,
                    enforce: true
                }
            }
        }
    }
});


//console.log(JSON.stringify(configs.module.rules));

module.exports  = configs;