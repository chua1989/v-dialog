const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.js');
const webpack = require('webpack');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: config.outPath,
		hot: true
	},
	//开发者模式，不压缩,查看//webpack.js.org/configuration/mode/#root
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});
