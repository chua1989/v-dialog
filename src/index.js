import VDialog from './dialog/index.js'

const install = function(Vue, options = {}) {
    Vue.use(VDialog)

    Vue.prototype.$dialog = VDialog.func
}
//
// if (typeof window !== 'undefined' && window.Vue) {
//     // 注册所有组件
//     install(window.Vue);
// }

const all = {
    install,
    VDialog
}

export {
    all as default,
    VDialog
}
