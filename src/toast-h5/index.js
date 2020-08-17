/**
 * author: chua
 * date: 2019.8.21
 * description: h5 toast提示
 * eg:
    import toast from 'H5Coms/toast/toast';
    toast('toast 例子');
 */
import Vue from 'vue'
import Toast from './v-toast-h5.vue'

let ToastConstructor = Vue.extend(Toast); // 构造函数
let seed = 1; // 计数
const toastPup = function() {
    let instance; // 实例
    return function(options = {}) {
        // 如果有实例正在展示，则不做任何处理
        if (instance && instance.visible) {
            return;
        }

        if (typeof options === 'string') {
            options = {
                msg: options
            }
        }

        let id = `toast_${seed++}`;
        instance = new ToastConstructor({
            propsData: options
        }).$mount();
        instance.id = id;
        instance.visible = true;
        document.body.appendChild(instance.$el);
        return instance;
    };
}
// toast同时只允许有一个实例
const VToastH5 = toastPup()
export default VToastH5
