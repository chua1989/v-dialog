const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const config = require('./config.js');
const utils = require('./utils.js');
const common = require('./webpack.common.js');
const env = process.env.NODE_ENV = process.argv[2] || 'dev';// 设置环境变量

const webpackConfig= merge(common, {
	devtool: 'cheap-module-source-map',//开发环境使用inline-source-map
	entry: {
		index: path.resolve(__dirname, '../src/index.js')
	},
	externals: {
		vue: 'vue'
	},
	output: {
		filename: '[name].js',
		// chunkFilename: 'chunks/[name].js',
		path: config.outPath,
		publicPath: '/',
		library: 'v-dialog', // library指定的就是你使用require时的模块名，这里便是require("PayKeyboard")
		libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
		umdNamedDefine: true
	},
	//生产模式，代码压缩,查看//webpack.js.org/configuration/mode/#root
	mode: 'development',// 'production'
})

module.exports = webpackConfig;
