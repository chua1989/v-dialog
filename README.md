# v-dialog
基于vue2.0的dialog组件  
功能包括：dialog和toast。分为pc和h5版本  
**代码安装**
> npm install @chua1989/v-dialog --save

## dialog
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
import { VDialog } from '@chua1989/v-dialog'

Vue.use(VDialog) // 或者Vue.component(VDialog.name, VDialog)
// 如果只想使用函数调用方式则使用下面的方式
Vue.prototype.$dialog = VDialog.func
```
**使用**  
函数调用
```
// demo.vue
<script>
export default {
    mounted() {
        this.$dialog('这是一个dialog的基本例子，通过函数直接调用')
        // 或者
        this.$dialog({
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
import { VDialog } from '@chua1989/v-dialog'
<script>
export default {
    mounted() {
        VDialog.func({
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
        <VDialog :isShow.sync="isDialogShow" msg="这是一个dialog组件实现的对话框"></VDialog>
    </div>
</template>

<script>
import { VDialog } from '@chua1989/v-dialog'
export default {
    components: { VDialog }
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
title: {
    描述：对话框标题
    类型: String,
    默认值: '提示'
},
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
    描述：主题颜色
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

## toast
由于toast的功能比较单一，所以不提供组件调用的方式  
### 用法一、全局配置
**引入**  
全部引入参考dialog部分  
按需引入  
```
// index.js
// 必须先引入vue
import Vue from 'vue'
import { VToast } from '@chua1989/v-dialog'
Vue.prototype.$toast = VToast
```
**使用**  
函数调用
```
// demo.vue
<script>
export default {
    mounted() {
        this.$toast('这是一个toast的基本例子')
    }
}
</script>
```
【注】对于toast来说，默认同一时间可以展示多个，从上往下排列  
要想只展示一个toast,则给所有的toast设置相同的id，id相同的toast同一时间只展示一个
```
this.$toast({ id: 'only-one', msg: '复制成功' })
```
### 用法二、Vue组件内配置
**引入 + 使用**  
```
// demo.vue
<script>
import { VToast } from '@chua1989/v-dialog'
export default {
    mounted() {
        VToast({
            id: 'only-one'，// id相同的toast同一时间只展示一个
            msg: '这是一个toast的基本例子'
        })
    }
}
</script>
```
### 参数说明
```
id: {
    描述：toast的id
    类型: String,
    默认值: 'toast_xx'，其中xx是一个自增的数字
},
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
type: {
    描述：类型，支持error/success/warning/info四种类型，不同类型背景展示不同
    类型: String,
    默认值: 'info'
},
zIndex: {
    描述：toast框的z-index值
    类型: Number,
    默认值: 101
},
firstTop: {
    描述：第一个toast到文档顶部的距离
    类型: Number,
    默认值: 50, 单位px
},
gap: {
    描述：相邻两个toast的垂直间隔
    类型: Number,
    默认值: 20, 单位px
},
onClose: {
    描述：关闭后的回调
    类型: Function,
    默认值: () => {}
}
```
