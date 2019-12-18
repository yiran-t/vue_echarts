<!--
 * @Author: your name
 * @Date: 2019-10-28 15:30:22
 * @LastEditTime: 2019-11-20 18:18:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \five\work_today\demo\src\views\Sub.vue
 -->
<template>
    <!-- Left组件分为三块 -->
    <el-container class="leftBox">
        <el-row id="rowTopBox">
            <el-col :span="8" class="leftTopFirst">
                <RightTop/>
            </el-col>
            <el-col :span="8" class="leftTopSecond">
                <LeftTopSecond/>
            </el-col>
        </el-row>
        <el-row id="rowBaseBox">
            <LeftBase/>
        </el-row>
    </el-container>
</template>
<script>
import RightTop from './RightTop.vue'
import LeftTopSecond from './LeftTopSecond.vue'
import LeftBase from './LeftBase.vue'
import { Row, Col, Container } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
    components: {
        RightTop,
        LeftTopSecond,
        LeftBase,
        'el-row': Row,
        'el-col': Col,
        'el-container': Container
    }
}
</script>
<style scoped lang="scss">
.leftBox{
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    padding-left: 0.2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column
}
#rowTopBox{
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.leftTopFirst{
    width: 100%;
    height: 50%;
    overflow: hidden;
}
.leftTopSecond{
    width: 100%;
    height: 50%;
}
#rowBaseBox{
    width: 100%;
    height: 25%;
}
</style>
