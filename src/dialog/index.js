import Vue from 'vue'
import VDialog from './v-dialog.vue'
/**
 * author: chua
 * date: 2019.8.21
 * description: 简单错误/信息提示框，外部调用
 * eg:
 import { Dialog } from '@chua1989/v-dialog';
 // $dialog多次被调用，只展示最开始的那个
 Dialog.func({
        msg: '警告！',
        hasNo: false, // 是否有no按钮
        hasYes: true, // 是否有yes按钮
        noText: '取消', // no按钮文本
        yesText: '确定', // yes按钮文本
        onNo() {}, // no按钮响应函数
        onYes() {}, // yes按钮响应函数
        onClose() {} // 关闭图标响应函数
    });
 */
let DialogExtend = Vue.extend(VDialog);
// 所有的dialog应当只有一个实例
const dialogPup = function() {
    let instance; // 实例
    return function(options = {}) {
        // 如果dialog正在展示，则不做任何处理
        if (instance && instance.visible) {
            return;
        }
        instance = new DialogExtend({
            propsData: options
        }).$mount();
        instance.visible = true;
        document.body.appendChild(instance.$el);
    }
}

const install = function(Vue) {
    Vue.component(VDialog.name, VDialog)
}

VDialog.func = dialogPup()
VDialog.install = install

export default VDialog
