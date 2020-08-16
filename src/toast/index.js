/**
 * author: chua
 * date: 2019.8.21
 * description: h5 toast提示
 * eg:
    import { VToast } from '@chua1989/v-dialog';
    VToast('toast 例子');
    VToast({msg:'toast 例子', type: 'error', duration: 3000});
    // 如果传入了id,相同id只会有一个toast,即前一个toast没有消失，后一个toast不会展示
    VToast({msg:'toast 例子', id: 'xxx'});
    VToast{
        id: 'xxx'
        msg: '警告！',
        duration: 3000,
        type: 'info',
        zIndex: 101,
        firstTop: 50, // 第一个toast到文档顶部的距离
        gap: 20, // 相邻两个toast的垂直间隔
        onClose() {} // 关闭图标响应函数
    });
 */
import Vue from 'vue'
import Toast from './v-toast.vue'

let firstTop = 50 // toast距离顶部的距离
let gap = 20 // 每相邻的两个toast的垂直间隙
let ToastConstructor = Vue.extend(Toast); // 构造函数
let seed = 1; // 计数
// toast实例map
// 结构为[['toast_xx', instance]]
let instanceMap = new Map()

const VToast = (options = {}, callback) => {
    let closeFn = callback || options.onClose
    if (typeof options === 'string') {
        options = {
            msg: options,
            onClose: callback
        }
    }
    firstTop = options.firstTop || 50
    gap = options.gap || 20

    let id = options.id || `toast_${seed++}`
    options.id && (delete options.id)

    // 如果当前id已经存在,则不处理
    // 用在场景：同一时间只有一个toast的情况
    if (instanceMap.has(id)) {
        return
    }

    options.onClose = function() {
        VToast.close(id, closeFn)
    }

    let instance = new ToastConstructor({
        propsData: options
    }).$mount();
    instance.id = id;
    instance.visible = true;
    let top = firstTop
    instanceMap.forEach(item => {
        top += gap + item.$refs.toast.offsetHeight
    })
    instance.top = top
    // 添加实例
    instanceMap.set(id, instance)
    document.body.appendChild(instance.$el);
    return instance;
};

// 用来处理toast实例列表的联动
VToast.close = function(id, callback) {
    instanceMap.delete(id)
    VToast.fixAllTopOffset()
    callback && callback()
}

// 修正instanceMap中的toast实例的top值
VToast.fixAllTopOffset = function() {
    let top = firstTop
    instanceMap.forEach(item => {
        item.top = top
        top += gap + item.$refs.toast.offsetHeight
    })
}
export default VToast
