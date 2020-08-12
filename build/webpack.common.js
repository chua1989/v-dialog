require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config.js');
const utils = require('./utils.js');
const env = process.env.NODE_ENV = process.argv[2] || 'dev';// 设置环境变量

module.exports =  {
    context: path.resolve(__dirname, '../'),//上下文环境
    output: {
        filename: '[name].js',
        path: config.outPath,
        publicPath: '/'
    },
    resolve: {//对extensions指定的类型的文件引用时路径可以使用别名
        extensions: ['.js', '.vue', '.json', '.scss', '.css'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'Assets': path.resolve(__dirname, '../src/assets'),
            'Coms': path.resolve(__dirname, '../src/components'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',//加载优先级最高
                include: [
                    path.resolve(__dirname, '../src')
                ].concat(env === 'dev'? [path.resolve(__dirname, '../demo')]: []),
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            ...utils.cssLoaders(),//配置css的loader
            {
                test: /\.js$/,
                // loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, '../src'),
                ].concat(env === 'dev'? [path.resolve(__dirname, '../demo')]: []),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [path.resolve(__dirname, '../src/assets/fonts')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [path.resolve(__dirname,'../src/assets/fonts')],// 由于fonts下面的svg的文件名要作为svg的id,所以不能加hash
                options: {
                    limit: 100,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                }
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin((percentage, message, ...args) => {
            // e.g. Output each progress message directly to the console:
            console.info(percentage, message/*, ...args*/);
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        // 请确保引入这个插件！
        new VueLoaderPlugin()
    ]
};

