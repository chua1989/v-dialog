const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');

const env = process.env.NODE_ENV = process.argv[2] || 'dev';// 设置环境变量

const config = require('./config');
const PagePath = config[env].sourceDir;

exports.assetsPath = function (_path) {
  const assetsSubDirectory = config.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path);
}

/*
* 郑重提示：每个页面的html、js名称必须不同，否则相同名称的文件会打包到一起，导致出错
* */
/*
* @author chua 2019.5.15
* @description 多入口配置
* @return {Object} map 对应的每个页面的输入路径
* */
exports.entries = function () {
    let entryFiles = glob.sync(`${PagePath}/**/*.js`);
    let map = {}

    entryFiles.forEach((filePath) => {
        let filename = filePath.substring(`${PagePath}/`.length, filePath.lastIndexOf('.'));
        map[filename] = [filePath];
        // webpack-hot-middleware/client 开发环境下实现自动热更新
        if (process.env.NODE_ENV === 'dev') {
            map[filename].unshift('webpack-hot-middleware/client?noInfo=true&reload=true');
        }
    })
    return map;
}



/*
打包结果剥离出文件名称和文件夹名称相同的html文件，将这类型的html向上提一个文件夹层级，避免html文件访问太复杂。
比如：/pages/index/index.html 提一个文件夹层级--> /pages/index.html
访问的时候：xxx.com/index/index --> xxx.com/index.html
 */
function uperSameNameOfFolderAndFile(fileName){
    let realName = fileName.replace(/((^|[/\\])([\w-]+))([/\\]\3.html)$/, '$1.html');
    return realName;
}
/*
* @author chua 2019.5.15
* @description 多页面输出配置
* @return {Array} HtmlWebpackPlugins 对应的每个页面的输出配置
* */
exports.htmlPlugin = function () {
    let entryHtml = glob.sync(`${PagePath}/**/*.html`);
    let HtmlWebpackPlugins = [];

    entryHtml.forEach((filePath) => {
        let chunkFilename = filePath.substring(`${PagePath}/`.length, filePath.lastIndexOf('.'));
        let realName = uperSameNameOfFolderAndFile(filePath.substring(`${PagePath}/`.length));
        let options = {
            template: filePath, // 模板来源
            filename: realName, // `${filename}.html`, // 文件名称
            chunks: [chunkFilename/*, 'common', 'manifest'*/],
            cache: true,
            inject: true
        };

        if (process.env.NODE_ENV === 'prod') {
            options = merge(options, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'auto'// 'dependency'
            });
        }
        HtmlWebpackPlugins.push(new HtmlWebpackPlugin(options));
    })
    return HtmlWebpackPlugins;
}


/*
* @author chua 2019.5.17
* @description 对开发环境和现网环境配置不同的css处理。
* @return {Object} map 对应的css配置
* */
exports.cssLoaders = function(env){
    // 使用css modules
    let cssModulesLoader = {
        loader: 'css-loader',
        options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]_[local]_[hash:base64:5]',
            camelCase: true
        }
    };
    if(env === 'dev'){
        return [{
            test: /\.css$/,
            oneOf: [
                // 这里匹配 `<style module>`
                {
                    resourceQuery: /module/,
                    use: ['vue-style-loader', cssModulesLoader, 'postcss-loader']
                },
                // 这里匹配普通的 `<style>` 或 `<style scoped>`或其他外部css
                {
                    use: ['vue-style-loader', 'css-loader', 'postcss-loader']
                }
            ]
        },
        {
            test: /\.scss$/,
            oneOf: [
                // 这里匹配 `<style lang="scss" module>`
                {
                    resourceQuery: /module/,
                    use: ['vue-style-loader', cssModulesLoader, 'postcss-loader', 'sass-loader']
                },
                // 这里匹配普通的 `<style lang="scss">` 或 `<style  lang="scss" scoped>`或者其他外部scss
                {
                    use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ],
        }]
    }else{
        return [{
            test: /\.css$/,
            oneOf: [
                // 这里匹配 `<style module>`
                {
                    resourceQuery: /module/,
                    use: [MiniCssExtractPlugin.loader, cssModulesLoader, 'postcss-loader']
                },
                // 这里匹配普通的 `<style>` 或 `<style scoped>`或其他外部css
                {
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                }
            ]
        },
        {
            test: /\.scss$/,
            oneOf: [
                // 这里匹配 `<style module>`
                {
                    resourceQuery: /module/,
                    use: [MiniCssExtractPlugin.loader, cssModulesLoader, 'postcss-loader', 'sass-loader']
                },
                // 这里匹配普通的 `<style>` 或 `<style scoped>`或者其他外部scss
                {
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ]
        }]
    }
}
