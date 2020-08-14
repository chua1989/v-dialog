# v-dialog
基于vue2.0的dialog组件  
功能包括：dialog和toast。分为pc和h5版本  

## 使用
**代码安装**
> npm install @chua1989/v-dialog --save
### 用法一、函数调用
```
// index.js
// 必须先引入vue
import Vue from 'vue'
import { $vDialog } from '@chua1989/v-dialog'
// 挂载到Vue原型链上
Vue.prototype.$dialog = $vDialog


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
**特性**  
对于函数效用的dialog来说，同一时间只展示一个dialog。  
即：如果当前有正在展示的dialog,则后续调用的dialog无效  
### 用法二、作为vue组件引用
```
<template>
    <div>
        <VDialog msg="这是一个dialog组件实现的对话框"></VDialog>
    </div>
</template>

<script>
import { VDialog } from '@chua1989/v-dialog'
export default {
    components: { VDialog }
}
</script>
```
或者注册为全局组件也可以

