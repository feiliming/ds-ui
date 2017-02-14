var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:[
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, './src/js/main.js')
    ],
    //devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        //publicPath: path.resolve(__dirname, '/dist/'),
        filename: '[name].bundle.js', //加[hash]可防止缓存
        //chunkFilename: '[id].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                include: [path.resolve(__dirname, './src')],
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                include: [path.resolve(__dirname, './src')],
                loader: 'url-loader?limit=10000&name=/images/[name].[ext]'
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "第一个title",
            filename: 'index.html', //相对于output.path
            template: __dirname + '/src/templates/index.html', //指定模板文件,可以是 html, jade, ejs, hbs, 等等
            chunks: ['main'], //引用哪个chunk
            hash: true, //引用文件名哈希
            favicon: './src/images/favicon.ico'
        }),
    ],
};