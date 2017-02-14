var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:[
        path.resolve(__dirname, './src/js/main.js')
    ],
    devtool: 'source-map',
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
                //loader: ExtractTextPlugin.extract("style-loader","css-loader") //webpack2.0之前的写法
                //loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
                //loader: ["style-loader", "css-loader", "less-loader"]
                /**use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]*/
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true, importLoaders: 1 }
                        },
                        {
                            loader: 'postcss-loader',
                            options: { 
                                sourceMap: true,
                                browsers: ["last 2 versions"] ,
                                /**plugins: function () {
                                    return [
                                        //require('precss'),
                                        require('autoprefixer')
                                    ];
                                }*/
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: { sourceMap: true }
                        }
                    ]
                })
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
        new HtmlWebpackPlugin({
            title: "第一个title",
            filename: 'index.html', //相对于output.path
            template: __dirname + '/src/templates/index.html', //指定模板文件,可以是 html, jade, ejs, hbs, 等等
            chunks: ['main'], //引用哪个chunk
            hash: true, //引用文件名哈希
            favicon: './src/images/favicon.ico'
        }),
        new ExtractTextPlugin("/css/[name].css"),
    ],
};