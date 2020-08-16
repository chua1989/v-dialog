/* 引入svg字体库 */
import Vue from 'vue'
import 'Assets/fonts/index'
import Icon from 'Coms/icon/icon.vue'
import VDialog from './dialog/index'
import VToast from './toast/index'
Vue.component('icon', Icon)

const install = function(Vue, options = {}) {
    Vue.use(VDialog)

    Vue.prototype.$toast = VToast
    Vue.prototype.$dialog = VDialog.func
}
//
// if (typeof window !== 'undefined' && window.Vue) {
//     // 注册所有组件
//     install(window.Vue);
// }

const all = {
    install,
    VDialog,
    VToast
}

export {
    all as default,
    VDialog,
    VToast
}
