# v-dialog
基于vue2.0的dialog组件  
功能包括：dialog和toast。分为pc和h5版本  
**代码安装**
> npm install @chua1989/v-dialog --save  

【注】h5默认使用rem作为单位，以750px宽度为基准，为7.5rem。请调整html的字体大小为
```
html{
    font-size:13.33333333vw;
}
```
并且禁止缩放，使用
```
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
```
## dialog-h5
### 用法一、全局配置
**引入**  
全部引入  
```
// index.js
// 必须先引入vue
import Vue from 'vue'
import ALL from '@chua1989/v-dialog'

Vue.use(ALL);
```
按需引入  
```
// index.js
// 必须先引入vue
import Vue from 'vue'
import { VDialogH5 } from '@chua1989/v-dialog'

Vue.use(VDialogH5) // 或者Vue.component(VDialog.name, VDialog)
// 如果只想使用函数调用方式则使用下面的方式
Vue.prototype.$dialogH5 = VDialogH5.func
```
**使用**  
函数调用
```
// demo.vue
<script>
export default {
    mounted() {
        this.$dialogH5('这是一个dialog的基本例子，通过函数直接调用')
        // 或者
        this.$dialogH5({
            msg: '这是一个dialog的基本例子，通过函数直接调用'
        })
    }
}
</script>
```
【注】对于函数调用的dialog来说，同一时间只展示一个dialog。即：如果当前有正在展示的dialog,则后续调用的dialog无效  
  
组件调用
```
<template>
    <div>
        <v-dialog :isShow.sync="isDialogShow" msg="这是一个dialog组件实现的对话框"></v-dialog>
    </div>
</template>
```
### 用法二、Vue组件内配置
**引入 + 使用**  
函数调用
```
// demo.vue
import { VDialogH5 } from '@chua1989/v-dialog'
<script>
export default {
    mounted() {
        VDialogH5.func({
            msg: '这是一个dialog的基本例子，通过函数直接调用'
        })
    }
}
</script>
```
组件调用
```
<template>
    <div>
        <VDialogH5 :isShow.sync="isDialogShow" msg="这是一个dialog组件实现的对话框"></VDialogH5>
    </div>
</template>

<script>
import { VDialogH5 } from '@chua1989/v-dialog'
export default {
    components: { VDialogH5 }
}
</script>
```
### 参数说明
```
isShow: {
    描述：对话框是否展示。只有在组件调用方式才起作用
    类型: Boolean,
    默认值: false，不展示
},
// h5页面为了简约，所以不提供标题
// title: {},
msg: {
    描述：文本内容
    类型: String,
    默认值: ''
},
hasNo: {
    描述：是否展示“取消”按钮
    类型: Boolean,
    默认值: false，不展示取消按钮
},
hasYes: {
    描述：是否展示“确定”按钮
    类型: Boolean,
    默认值: true，展示确定按钮
},
noText: {
    描述：“取消”按钮的文本
    类型: String,
    默认值: '取消'
},
yesText: {
    描述：“确定”按钮的文本
    类型: String,
    默认值: '确定'
},
// 主题颜色
themeColor: {
    描述：主题颜色,和pc端不同的是，这个主题色只控制“确定”按钮颜色
    类型: String,
    默认值: '#409eff'
},
zIndex: {
    描述：对话框的z-index值
    类型: Number,
    默认值: 100
},
onNo: {
    描述：点击“取消”后的回调。弹窗会被关闭
    类型: Function,
    默认值: () => {}
},
onYes: {
    描述：点击“确定”后的回调。弹窗会被关闭
    类型: Function,
    默认值: () => {}
},
onClose: {
    描述：点击右上角“关闭”按钮后的回调。弹窗会被关闭
    类型: Function,
    默认值: () => {}
}
```

## toast-h5
由于toast的功能比较单一，所以不提供组件调用的方式  
### 用法一、全局配置
**引入**  
全部引入参考dialog部分  
按需引入  
```
// index.js
// 必须先引入vue
import Vue from 'vue'
import { VToastH5 } from '@chua1989/v-dialog'
Vue.prototype.$toastH5 = VToastH5
```
**使用**  
函数调用
```
// demo.vue
<script>
export default {
    mounted() {
        this.$toastH5('这是一个toast的基本例子')
    }
}
</script>
```
【注】对于toast-h5来说，同一时间只展示一个（pc端可以展示多个）

### 用法二、Vue组件内配置
**引入 + 使用**  
```
// demo.vue
<script>
import { VToastH5 } from '@chua1989/v-dialog'
export default {
    mounted() {
        VToastH5({
            msg: '这是一个toast的基本例子'
        })
    }
}
</script>
```
### 参数说明
```
// 由于同一时间只展示一个toast，所以不提供id字段
//id: {},
msg: {
    描述：展示文本
    类型: String,
    默认值: ''
},
duration: {
    描述：toast显式时长
    类型: Number,
    默认值: 3000，单位毫秒
},
// h5的toast值提供简单的功能，所以不提供type字段
/type: {},
zIndex: {
    描述：toast框的z-index值
    类型: Number,
    默认值: 101
},
// h5的toast同一居中，所以不提供该字段
// firstTop: {},
// 由于同一时间只展示一个toast，所以不提供gap字段
// gap: {},
onClose: {
    描述：关闭后的回调
    类型: Function,
    默认值: () => {}
}
```
