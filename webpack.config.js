const path = require('path');


// let ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            // loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            loader: 'style-loader!css-loader!resolve-url-loader!sass-loader'
        },
        {
            test    : /\.(png|jpg|svg)$/,
            loader  : 'url-loader?limit=30000&name=images/[name].[ext]'
        }]
    },
    // plugins: [
    //     // new webpack.HotModuleReplacementPlugin(),
    //     // new webpack.NoErrorsPlugin(),
    //     new ExtractTextPlugin("bundle.css")
    // ]
};