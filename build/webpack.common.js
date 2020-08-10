require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config.js');
const utils = require('./utils.js');
const env = process.env.NODE_ENV = process.argv[2] || 'dev';// 设置环境变量

module.exports =  {
    context: path.resolve(__dirname, '../'),//上下文环境
    entry: utils.entries(),//多入口
    output: {
        filename: '[name].js',
        path: config.outPath,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',//加载优先级最高
                include: [
                    path.resolve(__dirname, '../src'),
                    path.resolve(__dirname, '../demo')
                ],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                    // 添加vue中html部分直接引用静态资源的解析.vue-loader默认配置里面没有audio，见：https://vue-loader.vuejs.org/zh/options.html#transformasseturls
                    transformAssetUrls: {
                        audio: 'src'
                    }
                }
            },
            ...utils.cssLoaders(env),//配置css的loader
            {
                test: /\.js$/,
                // loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, '../src'),
                    path.resolve(__dirname, '../demo'),
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                    publicPath: config[env].assetsPublicPath
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        // ignoreCustomFragments: [],
                        root: path.resolve(__dirname, '../demo'),// html中引用时直接使用"/assets/img/xxx.ico"这样子
                        attrs: ['img:src', 'link:href']
                    }
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
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                CDN_PATH: JSON.stringify(config[env].assetsPublicPath)
            }
        }),
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        ...utils.htmlPlugin()//html页面处理
    ]
};

