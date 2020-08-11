'use strict'

const path = require('path')

module.exports = {
    port: 8003,
    assetsSubDirectory: 'static',//静态资源目录
    outPath: path.resolve(__dirname, '../dist'),//打包路径
    dev: {
        env: 'dev',
        sourceDir: path.resolve(__dirname, '../demo') // 入口js资源路径
    },
    prod: {
        env: 'prod',
        sourceDir: path.resolve(__dirname, '../src') // 入口js资源路径
    }
}
