/* 引入svg字体库 */
import Vue from 'vue'
import 'Assets/fonts/index'
import Icon from 'Coms/icon/icon.vue'
import VDialog from './dialog/index'
import VDialogH5 from './dialog-h5/index'
import VToast from './toast/index'
import VToastH5 from './toast-h5/index'
Vue.component('icon', Icon)

const install = function(Vue, options = {}) {
    Vue.use(VDialog)
    Vue.use(VDialogH5)

    Vue.prototype.$dialog = VDialog.func
    Vue.prototype.$dialogH5 = VDialogH5.func
    Vue.prototype.$toast = VToast
    Vue.prototype.$toastH5 = VToastH5
}
//
// if (typeof window !== 'undefined' && window.Vue) {
//     // 注册所有组件
//     install(window.Vue);
// }

const all = {
    install,
    VDialog,
    VDialogH5,
    VToast,
    VToastH5
}

export {
    all as default,
    VDialog,
    VDialogH5,
    VToast,
    VToastH5
}
