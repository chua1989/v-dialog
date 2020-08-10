const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.dev.js');
//webpack配置初始化
const compiler = webpack(config);

//告诉express用webpack-dev-middleware和用webpack.config.js配置文件作为基础
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}))

//热更新
app.use(webpackHotMiddleware(compiler, {
	log: console.log
}));

app.listen(3000, function(){
	console.log('example app listening on port 3000');
})