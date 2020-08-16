# v-dialog
基于vue2.0的dialog组件  
功能包括：dialog和toast。分为pc和h5版本  

## 使用
**代码安装**
> npm install @chua1989/v-dialog --save
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
