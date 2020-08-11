const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.js');
const utils = require('./utils.js');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: config.outPath,
		hot: true
	},
	//开发者模式，不压缩,查看//webpack.js.org/configuration/mode/#root
	mode: 'development',
	module: {
		rules: [
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
		new webpack.HotModuleReplacementPlugin(),
		...utils.htmlPlugin()//html页面处理
	]
});
