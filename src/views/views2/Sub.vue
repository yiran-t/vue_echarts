<!--
* @Author: your name
* @Date: 2019-10-28 15:30:22
 * @LastEditTime: 2019-12-14 14:44:10
 * @LastEditors: Please set LastEditors
* @Description: In User Settings Edit
* @FilePath: \five\work_today\demo\src\views\Sub.vue
-->
<template>
<!-- tatal Box -->
    <el-container id="subBox">
        <div id="subWrap2"></div>
    <!-- 总标题 -->
        <el-row id="rowTopBox">
            <img src="../../assets/image/bg-02.svg">
            <span @click= 'back' style="position: absolute;font-size: 0.24rem;color: #c0c4cc;border-radius: 0.04rem;border: 0.03rem solid #667dab;margin-top: 0.2rem;margin-left: 0.2rem;">返回</span>
            <span @click= 'logOut' style="position: absolute;font-size: 0.24rem;color: #c0c4cc;border-radius: 0.04rem;border: 0.03rem solid #667dab;margin-top: 0.2rem;margin-left: 1rem;">退出登录</span>
            <p>{{this.city}}分公司业绩榜</p>
            <!-- <TOPLEFT/> -->
        </el-row>
    <!-- 主内容 -->
    <el-row id="rowBaseBox">
        <!-- 左 -->
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" id="leftBox">
        <Left/>
        </el-col>
        <!-- 中 -->
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" id="MidBox">
        <!-- <Mid/>  -->
        <div class="mid">
            <!-- 标题 -->
            <div class="topVip">
                <img src="../../assets/image/little01.png" class="topVipImg">
                <span class="topVipSpan">新单标准保费/件数 <i style="font-size: 0.12rem;">(单位：万元/件)</i></span>
            </div>
            <div class="map">
                <midMap></midMap>
            </div>
            <div class="viewData">
                <viewData></viewData>
            </div>
        </div>
        </el-col>
        <!-- 右 -->
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" id="RightBox">
        <Right/>
        </el-col>
    </el-row>
    <!-- 礼花移动效果 -->
        <div id="fireworksD">
            <p id="fireworksp">{{ this.bigOrderData2 }}</p>
            <canvas id="canvasD"></canvas>
        </div>
        <div id="yanHua">
            <div id="firecracker"><!-- <img src="imgs/firecracker.png" alt="" width="8px"> --></div>
        </div>
    </el-container>
</template>

<script>
import Left from '../../components/components2/SubEcharts/Left.vue'
import Right from '../../components/components2/SubEcharts/Right.vue'
import midMap from '../../components/components2/SubEcharts/map.vue'
import viewData from '../../components/components2/SubEcharts/viewData.vue'
import axios from 'axios'
import base from '../../untils/base.js'
import { Row, Container, Col } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
    // inject: ['reload'], // 引入方法
    data () {
        return {
            bigOrderData2: '',
            city: '',
            agentname: '',
            comname: '',
            amount: '',
            orderList: '',
            comcode: ''
        }
    },
    created () {
        localStorage.removeItem('fires')
    },
    mounted () {
        /* eslint no-undef: 'off' */
        // startAnimate('canvasD')
        this.city = localStorage.getItem('myComCode')
        this.comcode = localStorage.getItem('orgs')
        let that = this
        axios({
            url: `${base.url}/yanhua?comcode=${that.comcode}`,
            method: 'post'
        }).then(data => {
            if (data.data.length !== 0) {
                let a = data.data[0].comname
                let b = data.data[0].agentname
                let c = data.data[0].amount
                this.bigOrderData2 = a + b + '代理人' + '签单' + (c / 10000).toFixed(2)
            }
        })
    },
    components: {
        Left,
        midMap,
        viewData,
        Right,
        'el-row': Row,
        'el-col': Col,
        'el-container': Container
    },
    methods: {
        back () {
            this.$router.push({ path: '/emain' })
            localStorage.removeItem('myComCode')
            localStorage.removeItem('yanhua')
            // localStorage.removeItem('loginComCode')
        },
        logOut () {
            this.$router.push({ path: '/' })
            localStorage.removeItem('myComCode')
            localStorage.removeItem('yanhua')
            localStorage.removeItem('loginComCode')
        }
    }
}
</script>
<style scoped>
    @keyframes drop {
        0% {
            transform: translateY(-100px);
            opacity: 0;
        }
        90% {
            opacity: 1;
            transform: translateY(10px);
        }
        100% {
            transform: translateY(0px);
        }
    }
</style>
<style scoped lang="scss" type="text/css">
#subBox{
    width: 100%;
    height: 100vh;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    background: url(../../assets/image/bg/bg11.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    box-sizing: border-box;
    overflow: hidden;
}
#rowTopBox{
    position: relative;
    width: 100%;
    min-height: 10vh;
    display: flex;
    overflow: hidden;
}
#rowTopBox>img{
    position: absolute;
    width: 60%;
    left: 50%;
    top: 70%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
}
#rowTopBox p{
    font-size: 0.54rem;
    width: 70%;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    line-height: 10vh;
    letter-spacing: 0.07rem;
}
#rowBaseBox{
    width: 100%;
    min-height: 90vh;
    display: flex;
}
#leftBox{
    width: 21.5%;
    height: 90vh
}
#MidBox{
    width: 56%;
    height: 90vh
}
#RightBox{
    width: 22%;
    height: 90vh
}

/* 添加 */
.mid{
    width: 100%;
    height: 99.2%;
    margin: 0 0.1rem;
    position: relative;
}
.map{
    position: absolute;
    width: 90%;
    height: 92%;
    top: 5%;
}
.viewData{
    width: 100%;
    margin-top: 0.3rem;
}
.topVip{
    width: 45%;
    height: 5.8%;
    display: flex;
    flex-direction: column;
}
.topVipImg{
    width: 7rem;
    height: 0.8rem;
    margin-top: 0.1rem;
}
.topVipSpan{
    font-size: 0.38rem;
    margin-top: -0.6rem;
    margin-left: 0.2rem;
    letter-spacing: 0.02rem;
}
/* 烟花效果 */
#fireworksD{
    position: relative;
    position: absolute;
    right: 0.15rem;
    top: 14vh;
    width: 21.1%;
    height: 25vh;
    transform: scale(1);
    animation: fireworks 1s 3s;
    z-index: 100;
    overflow: hidden;
    background: url(../../assets/image/fireworks1.gif) no-repeat;
    background-size: cover;
    // background: yellowgreen
}

#fireworksp {
    position: absolute;
    top: 50%;
    left: 55%;
    white-space: nowrap;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    font-size: 0.3rem;
    color: #E5C631;
    overflow: hidden;
}

#fireworksD>#canvasD{
    position: absolute;
    left: 0%;
    width: 100%;
    height: 100%
}
#yanHua {
    position: absolute;
    top: 35%;
    left: 25%;
    width: 65%;
    height: 20%;
    transform:rotate(-15deg);
    -ms-transform:rotate(-15deg);
    -moz-transform:rotate(-15deg);
    -webkit-transform:rotate(-15deg);
    -o-transform:rotate(-15deg);
}
#firecracker{
    position: absolute;
    left: 10%;
    bottom: 10%;
    margin-left: -4px;
    animation: firecracker 10s forwards;
    height: 2px;
    background: linear-gradient(-20deg, #93458A, rgba(0, 0, 255, 0));
    transform:rotate(0deg);
    -ms-transform:rotate(0deg);
    -moz-transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    border-radius: 999px;
    -webkit-filter: drop-shadow(0 0 6px #93458A);
        filter: drop-shadow(0 0 6px #93458A);
    -webkit-animation: tail 3000ms ease-in-out infinite, shooting 30000ms ease-in-out infinite;
        animation: tail 3000ms ease-in-out infinite, shooting 30000ms ease-in-out infinite;
}
#firecracker::before, #firecracker::after {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 0.04rem;
    background: linear-gradient(-20deg, rgba(0, 0, 255, 0), #93458A, rgba(0, 0, 255, 0));
    -webkit-transform: translateX(50%) rotateZ(60deg);
        transform: translateX(50%) rotateZ(60deg);
    border-radius: 100%;
    -webkit-animation: shining 3000ms ease-in-out infinite;
        animation: shining 3000ms ease-in-out infinite;
}
#firecracker::after {
    -webkit-transform: translateX(50%) rotateZ(-45deg);
        transform: translateX(50%) rotateZ(-45deg);
}
</style>
<style>
.el-table__body-wrapper{
    height: 3rem!important;
    overflow: auto!important;
    background: #446FDA!important;
}
/*滚动条整体样式*/
.el-table__body-wrapper::-webkit-scrollbar {
    width: 0.05rem;
    height: 0.01rem;
}
/*滚动条滑块*/
.el-table__body-wrapper::-webkit-scrollbar-thumb {
    border-radius: 0.1rem;
    background: #446FDA;
}
/*滚动条轨道*/
.el-table__body-wrapper::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
    border-radius: 0.1rem;
    background: #446FDA;
}
.el-popper{
    background: #446FDA!important;
    border: 0rem!important;
    box-shadow: 0.1rem 0.1rem 0.3rem #0F1A41!important;
}
.el-table td,.el-table th,.el-table__header-wrapper{
    background: #446FDA!important;
}
.el-table td{
    text-align: center;
    padding: 0.02rem!important;
    box-sizing: border-box;
}
 .el-table td {
    border-bottom: 1px solid#0F1A41!important;
    color: #ffffff;
}
.el-table::before, .el-table--group::after, .el-table--border::after {
    content: "";
    position: absolute;
    background-color: none!important;
    opacity: 0;
    z-index: 1;
}
.el-table th.is-leaf{
    border-bottom: 1px solid #122967!important;
    color: #ffffff;
}
</style>
