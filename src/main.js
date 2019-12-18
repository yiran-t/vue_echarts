/*
 * @Author: your name
 * @Date: 2019-12-11 15:40:12
 * @LastEditTime: 2019-12-16 10:44:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \libra-cockpit\cockpit\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import router2 from './router/index2.js'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$message = Message
// 全局数组接收定时器
Vue.prototype.timerCount = []
// alert(screen.width)
if (Number(screen.width) === 1280) {
    new Vue({
        router: router2,
        render: h => h(App)
    }).$mount('#app')
} else if (Number(screen.width) > 1280) {
    new Vue({
        router: router,
        render: h => h(App)
    }).$mount('#app')
}
