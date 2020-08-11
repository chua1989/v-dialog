const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('terser-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = require('./config.js');
const utils = require('./utils.js');
const common = require('./webpack.common.js');
const env = process.env.NODE_ENV = process.argv[2] || 'dev';// 设置环境变量

const webpackConfig= merge(common, {
	devtool: 'cheap-module-source-map',//开发环境使用inline-source-map
	plugins:[
		new MiniCssExtractPlugin({
			filename: utils.assetsPath('css/[name].[contenthash].css'),
			allChunks: true,
	    }),
	    new OptimizeCSSPlugin({
	        cssProcessorOptions: { safe: true }
	    })
	],
	//生产模式，代码压缩,查看//webpack.js.org/configuration/mode/#root
	mode: 'production',
    //提取公共chunk,避免多入口打入相同的公用代码
    //详细查看//webpack.js.org/plugins/split-chunks-plugin/
    optimization:{
        //提取manifest
        runtimeChunk: {
          name: 'manifest'
        },
        //提取其他公用chunk
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
	      	new UglifyJsPlugin({
	        	sourceMap: true
	      	})
	    ]
    }
})

module.exports = webpackConfig;
