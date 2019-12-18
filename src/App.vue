<!--
 * @Author: your name
 * @Date: 2019-11-04 10:04:57
 * @LastEditTime: 2019-11-21 20:03:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \work\six\cockpit\src\App.vue
 -->
<template>
    <div id="app">
       <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app',
    provide () {
        // 注册一个方法
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            isRouterAlive: true
        }
    }
}
</script>

<style>
    *{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
