/* 第三方库 */
import 'babel-polyfill'
import Vue from 'vue'
/* 本地库 */
import { $dialog } from '../src'

/* vue 相关 */
// 创建一个全局$dialog实例公用。如果再其他地方想要使用可以额外执行dialog()创建一个新的实例
Vue.prototype.$dialog = $dialog
