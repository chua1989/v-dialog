/**
 * author: chua
 * date: 2019.8.21
 * description: h5 简单错误/信息提示框，样式基于rem. 以750px宽度作图， html{ font-size:13.33333333vw; }
 * eg:
    import dialog from 'H5Coms/dialog/dialog';
    // 初始化一个dialog实例，可以有多个，同一个实例同时只展示一次
    let Dialog = dialog();
    Dialog({
        msg: '警告！',
        hasNo: false, // 是否有no按钮
        hasYes: true, // 是否有yes按钮
        noText: '取消', // no按钮文本
        yesText: '确定', // yes按钮文本
        onNo: function() {}, // no按钮响应函数
        onYes: function() {}, // yes按钮响应函数
        onClose: function() {} // 关闭图标响应函数
    });
 */
import Vue from 'vue';
import VDialogH5 from './v-dialog-h5.vue';

/**
 * author: chua
 * date: 2019.8.21
 * description: h5简单错误/信息提示框，外部调用
 * eg:
 import { VDialogH5 } from '@chua1989/v-dialog';
 // $dialog多次被调用，只展示最开始的那个
 VDialogH5.func({
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
let DialogExtend = Vue.extend(VDialogH5);
const dialogPup = function() {
    let instance; // 实例
    return function(options = {}) {
        // 如果dialog正在展示，则不做任何处理
        if (instance && instance.visible) {
            return;
        }

        if (typeof options === 'string') {
            options = {
                msg: options
            }
        }

        instance = new DialogExtend({
            propsData: options
        }).$mount();
        instance.visible = true;
        document.body.appendChild(instance.$el);
    }
}

const install = function(Vue) {
    Vue.component(VDialogH5.name, VDialogH5)
}

VDialogH5.func = dialogPup()// 所有的dialog应当只有一个实例
VDialogH5.install = install

export default VDialogH5
