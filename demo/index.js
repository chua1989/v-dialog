import './base';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';

Vue.use(VueRouter);

// 1. 定义 (路由) 组件。
const DialogBasic = () => import('./dialog/basic.vue')

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
    { path: '/dialog/basic', component: DialogBasic }
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
