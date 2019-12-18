/*
 * @Author: your name
 * @Date: 2019-11-04 10:04:58
 * @LastEditTime: 2019-12-14 10:42:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \work\six\cockpit\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/views2/Login.vue'
import Emain from '../views/views2/Emain.vue'
import Sub from '../views/views2/Sub.vue'

// 路由懒加载 es6
// const Login = resolve => require.ensure([], () => resolve(require('@/views/views2/Login')), 'Login')
// const Sub = resolve => require.ensure([], () => resolve(require('@/views/views2/Sub')), 'Sub')
// const Emain = resolve => require.ensure([], () => resolve(require('@/views/views2/Emain')), 'Emain')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Emain',
        name: 'Emain',
        component: Emain
    },
    {
        path: '/Sub',
        name: 'Sub',
        component: Sub
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
