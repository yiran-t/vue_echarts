<template>
    <div id="wrap">
        <el-row class="title">
            <span @click= 'logOut' id="logOut" style="font-size: 0.24rem;display: inline-block;color: #c0c4cc;padding: 0.04rem 0.06rem;border-radius: 0.04rem;border: 0.03rem solid #667dab;margin-top: 0.2rem;">退出登录</span>
            <img src="../../assets/image/bg-02.svg">
            <p>XXXX业绩榜</p>
        </el-row>
        <div class="main">
            <div class="left">
                <div class="left1">
                    <div class="topVip">
                        <img src="../../assets/image/little01.png" class="topVipImg">
                        <span class="topVipSpan">约保件数转化率</span>
                    </div>
                    <div class="leftTop">
                        <div class="leftTop1">
                            <leftTop></leftTop>
                        </div>
                        <div class="leftBottom">
                            <div class="topVip">
                                <img src="../../assets/image/little01.png" class="topVipImg">
                                <span class="topVipSpan">待收费 <i style="font-size: 0.2rem;">(单位：万元)</i></span>
                            </div>
                            <leftMid></leftMid>
                        </div>
                    </div>
                </div>
                <div class="left2">
                    <div class="topVip">
                        <img src="../../assets/image/little01.png" class="topVipImg">
                        <span class="topVipSpan">客户数 <i style="font-size: 0.2rem">(单位: 人)</i></span>
                    </div>
                    <div class="leftBot">
                        <leftBottom></leftBottom>
                    </div>
                </div>
            </div>
            <div class="mid">
                <div class="topVip">
                    <img src="../../assets/image/little01.png" class="topVipImg2">
                    <span class="topVipSpan2">新单标准保费/件数 <i style="font-size: 0.2rem;">(单位：万元/件)</i></span>
                </div>
                <div class="map">
                    <midMap></midMap>
                </div>
                <div class="viewData">
                    <viewData></viewData>
                </div>
            </div>
            <div class="right">
                <div class="right1">
                    <div class="topVip">
                        <img src="../../assets/image/little01.png" class="topVipImg">
                        <span class="topVipSpan">大单排名 <i style="font-size: 0.2rem;">(单位: 万元)</i></span>
                    </div>
                    <div class="rightTop">
                        <rightTop></rightTop>
                    </div>
                </div>
                <div class="right2">
                    <div class="topVip">
                        <img src="../../assets/image/little01.png" class="topVipImg">
                        <span class="topVipSpan">当月人力 <i style="font-size: 0.2rem;">(单位: 人)</i></span>
                    </div>
                    <div class="rightBottom">
                        <rightBottom></rightBottom>
                    </div>
                </div>
            </div>
        </div>
        <!-- 礼花移动效果 -->
        <div id="fireworks">
            <p id="fireworksP">{{ bigOrderData1 }}</p>
            <canvas id="canvas"></canvas>
        </div>
        <div id="yanHua">
            <div id="firecracker"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import base from '../../untils/base.js'
import { Row } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import leftTop from '../../components/components2/left/leftTop'
import leftMid from '../../components/components2/left/leftMid'
import leftBottom from '../../components/components2/left/leftBottom'
import rightTop from '../../components/components2/right/rightTop'
import rightBottom from '../../components/components2/right/rightBottom'
import midMap from '../../components/components2/mid/map'
import viewData from '../../components/components2/mid/viewData'

export default {
    data () {
        return {
            bigOrderData1: ''
        }
    },
    created () {
    },
    components: {
        leftTop: leftTop,
        leftMid: leftMid,
        leftBottom: leftBottom,
        rightTop: rightTop,
        rightBottom: rightBottom,
        midMap: midMap,
        viewData: viewData,
        'el-row': Row
    },
    mounted () {
        /* eslint no-undef: 'off' */
        setInterval(() => {
            this.addCSS()
        }, 1000)
        axios({
            url: `${base.url}/yanhua`,
            method: 'post'
        }).then(data => {
            let datas = data.data
            if (data.data.length === 0) {
            } else {
                this.bigOrderData1 = datas[0].comname + datas[0].agentname + '代理人' + '签单' + (Number(datas[0].amount) / 10000).toFixed(2)
            }
        })
        setInterval(() => {
            axios({
                url: `${base.url}/yanhua`,
                method: 'post'
            }).then(data => {
                let datas = data.data
                if (data.data.length === 0) {
                } else {
                    this.bigOrderData1 = datas[0].comname + datas[0].agentname + '代理人' + '签单' + (Number(datas[0].amount) / 10000).toFixed(2)
                }
            })
        }, 20000)
    },
    methods: {
        logOut () {
            this.$router.push({ path: '/' })
        },
        addCSSRule (sheet, selector, rules, index) {
            if ('insertRule' in sheet) {
                sheet.insertRule(selector + '{' + rules + '}', index)
            } else if ('addRule' in sheet) {
                sheet.addRule(selector, rules, index)
            }
        },
        addCSS () {
            this.addCSSRule(document.styleSheets[0], '@keyframes tail', `0% {width:0px;left: 50%;bottom: 55%;}100% {width:0.6rem;bottom: 68%;left: 80%;}`)
            this.addCSSRule(document.styleSheets[0], '@keyframes fireworks', `0% {transform: scale(0);}100% {transform: scale(1);}`)
            this.addCSSRule(document.styleSheets[0], '@keyframes shining', `0% {width:0px;}100% {width:0.6rem;}`)
            this.addCSSRule(document.styleSheets[0], '@keyframes shooting', `0% {transform: translateX(0);}100% {transform: translateX(0.4rem);}`)
        }
    }
}
</script>

<style scoped lang='scss'>
#wrap {
    width: 100%;
    min-height: 100vh;
    background: url(../../assets/image/bg/bg11.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
}
.el-row {
    &:last-child {
        margin-bottom: 0;
    }
}
.title{
    width: 100%;
    height: 10vh;
    color: #fff;
    position: relative;
    display: flex;
    overflow: hidden;
}
.title>img{
    position: absolute;
    width: 60%;
    left: 50%;
    top: 70%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
}
.title>span {
    font-size: 0.18rem;
    margin-left: 0.2rem;
    font-size: 0.1rem;
    position: absolute;
    letter-spacing: 0.04rem;
    top: 3%;
    left: 1%;
    color: #ccc
    }
.title>p{
    letter-spacing: 0.06rem;
    font-size: 0.54rem;
    width: 70%;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    line-height: 10vh;
    letter-spacing: 0.07rem;
}
.main{
    width: 100%;
    height: 90vh;
    padding: 0.2rem;
    box-sizing: border-box;
    display: flex;
}
.main>div{
    flex-direction: row;
}
.left{
    width: 20%;
    height: 100%;
}
.mid{
    width: 60%;
    height: 98.2%;
    margin: 0 0.1rem;
    border: 0.03rem solid #06305A;
    position: relative;
}
.map{
    position: absolute;
    width: 90%;
    height: 90%;
    top: 9%;
    overflow: hidden;
}
.viewData{
    width: 100%;
    margin-top: 0.3rem;
    overflow: hidden;
}
.right{
    width: 20%;
    height: 100%;
}
.left1{
    border: 0.03rem solid #06305A;
    height: 66%;
}
.leftTop{
    width: 100%;
    height: 100%;
    padding-top: 0.5rem;
    box-sizing: border-box;
}
.leftTop1{
    width: 100%;
    height: 38%;
}
.leftBottom{
    width: 100%;
    height: 62%;
}
.left2{
    border: 0.03rem solid #06305A;
    height: 31%;
    margin-top: 3%;
}
.leftBot{
    width: 100%;
    height: 86%;
    margin-top: 8%;
    box-sizing: border-box;
}
.right1{
    border: 0.03rem solid #06305A;
    height: 66%;
}
.rightTop{
    width: 100%;
    height: 99%;
    margin-top: 8%;
    // background: pink
}
.rightBottom{
    width: 100%;
    height: 90%;
    margin-top: 8%;
}
.right2{
    border: 0.03rem solid #06305A;
    height: 31%;
    margin-top: 3%;
}
.topVip{
    padding-top: 0.2rem;
    box-sizing: border-box;
    position: relative;
}
.topVipImg{
    position: absolute;
    width: 4rem;
    height: 0.7rem;
}
.topVipImg2{
    position: absolute;
    width: 6.8rem;
    height: 0.7rem;
}
.topVipSpan{
    position: absolute;
    top: 0.32rem;
    left: 0.2rem;
    color: #ffffff;
    font-size: 0.38rem;
    font-weight: 400;
    letter-spacing:0.003rem;
}
.topVipSpan2{
    position: absolute;
    top: 0.32rem;
    left: 0.2rem;
    color: #ffffff;
    font-size: 0.38rem;
    font-weight: 400;
    letter-spacing:0.003rem;
}

/* 烟花效果 */
#fireworks{
    position: relative;
    position: absolute;
    right: 0;
    top: 17vh;
    width: 24%;
    height: 26vh;
    transform: scale(1);
    animation: fireworks 1s 3s;
    z-index: 100;
    overflow: hidden;
    background: url(../../assets/image/fireworks1.gif) no-repeat;
    background-size: cover;
}

#fireworksP {
    position: absolute;
    top: 36%;
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

#fireworks>#canvas{
    width: 100%;
    height: 100%;
}
#yanHua {
    position: absolute;
    top: 40%;
    left: 30%;
    width: 64%;
    height: 0.5rem;
    transform:rotate(-15deg);
    -ms-transform:rotate(-15deg);
    -moz-transform:rotate(-15deg);
    -webkit-transform:rotate(-15deg);
    -o-transform:rotate(-15deg);
}
#firecracker{
    position: absolute;
    left: 0;
    bottom: 0;
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
.el-table .cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    text-align: center;
    width: 100%;
}
.el-table td, .el-table th{
    padding: 2px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
}
</style>
