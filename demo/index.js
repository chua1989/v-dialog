/* 第三方库 */
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './app.vue';

// 全部引入
import ALL from '../dist'
Vue.use(ALL)

// 按需引入
// import { VDialog, VToast } from '../src'
// Vue.use(VDialog)
// Vue.component(VDialog.name, VDialog)
// Vue.prototype.$dialog = VDialog.func
// Vue.prototype.$toast = VToast

Vue.use(VueRouter);

// 1. 定义 (路由) 组件。
const DialogBasic = () => import('./dialog/basic.vue')
const DialogHtmlCom = () => import('./dialog/html-com.vue')
const ToastBasic = () => import('./toast/basic.vue')
const ToastHtmlCom = () => import('./toast/only-one.vue')

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
    { path: '/dialog/basic', component: DialogBasic },
    { path: '/dialog/html-com', component: DialogHtmlCom },
    { path: '/toast/basic', component: ToastBasic },
    { path: '/toast/only-one', component: ToastHtmlCom }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    // mode: 'history',
    fallback: false,
    routes // (缩写) 相当于 routes: routes
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
/* eslint-disable no-new */
new Vue({
    router,
    el: '#app',
    render: h => h(App)
})
