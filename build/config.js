'use strict'

const path = require('path')

module.exports = {
    port: 8003,
    assetsSubDirectory: 'static',//静态资源目录
    outPath: path.resolve(__dirname, './dist'),//打包路径
    dev: {
        env: 'dev',
        assetsPublicPath: '/',
    },
    prod: {
        env: 'prod',
        assetsPublicPath: '//cdn1.com',


    }
}
