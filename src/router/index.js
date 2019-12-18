/*
 * @Author: your name
 * @Date: 2019-11-04 10:04:58
 * @LastEditTime: 2019-11-04 15:26:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \work\six\cockpit\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Emain from '../views/Emain.vue'
import Sub from '../views/Sub.vue'

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
