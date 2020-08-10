const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./config');

const app = express();

app.use(express.static(config.outPath));

app.use('/', function(req, res){
	res.sendFile(path.resolve(config.outPath, 'index.html'));
});

app.listen(3000, function(){
	console.log('example app listening on port 3000');
})
