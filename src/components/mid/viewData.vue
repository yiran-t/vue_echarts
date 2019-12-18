<template>
    <div class="viewData">
        <div class="title">
            <ul>
                <li>
                    <span class="title1">当日标保/件数</span>
                    <span class="title2">{{amountday}} / {{countday}}</span>
                </li>
                <li>
                    <span class="title1">当月标保/件数</span>
                    <span class="title2">{{amountmonth}} / {{countmonth}}</span>
                </li>
                <li>
                    <span class="title1">待收费/件数</span>
                    <span class="title2">{{waitCharge1}} / {{waitCharge2}}</span>
                </li>
            </ul>
        </div>
        <div class="marquee">
            <div class="marquee_box">
                <ul class="marquee_list" :class="{marquee_top:show}">
                    <li v-for="(item, index) in bestOrder" :key="index">
                        <span>{{item.comname}}</span>
                        <span class="red">{{item.agentname}}</span>
                        <span>代理人</span>
                        <span>签单</span>
                        <span class="red">{{item.amount}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="lists">
            <p>当月标准保费 <i style="font-size: 0.12rem;">(单位：万元)</i></p>
            <div class="wangBox">
                <p class="daily" style="margin-top: 0.16rem">
                    <span style="margin-left: 0.1rem">排名</span>
                    <span style="margin-left: 0.14rem">机构</span>
                    <span style="margin-left: 0.26rem">新单标保</span>
                    <span style="margin-left: 0.16rem">待收费</span>
                </p>
                <div class="wang">
                    <ul :style="{marginTop:top+'rem'}">
                        <li v-for="(i, index) in monthStandPrem" :key="i.c" :class="{active: current === index - 1}">
                            <span>{{i.count}}</span>
                            <span>{{i.comname}}</span>
                            <span>{{i.amount}}</span>
                            <span>{{i.waitprem}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="timeStamp">
            <span id="time" style="position: absolute; top: 4px;">{{ innerHTML }}</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import base from '../../untils/base.js'

export default {
    data () {
        return {
            innerHTML: '',
            show: false,
            top: 0,
            waitCharge1: '',
            waitCharge2: '',
            newStandPrem: '',
            waitCharge: '',
            monthStandPrem: '',
            bestOrder: '',
            flag: false,
            flag1: false,
            flag2: false,
            flag3: false,
            current: -1,
            amountmonth: '',
            amountday: '',
            countmonth: '',
            countday: ''
        }
    },

    created () {
        setInterval(() => {
            this.setTime()
        }, 1000)
        setInterval(() => {
            this.showMarquee()
        }, 2000)
        let _this = this
        for (let i = 0; i <= _this.timerCount.length; i++) {
            clearInterval(_this.timerCount[i]) // 清空所用定时器
            _this.timerCount.splice(0, _this.timerCount.length)
        }
    },

    beforeDestroy () {
        let _this = this
        for (let i = 0; i <= _this.timerCount.length; i++) {
            clearInterval(_this.timerCount[i]) // 清空所用定时器
            _this.timerCount.splice(0, _this.timerCount.length)
        }
        window.onresize = null
    },

    watch: {
        flag: {
            handler (newVal, oldVal) {
                this.flag = newVal
                // 新单标准保费---
                if (this.flag) {
                    axios({
                        url: `${base.url}/newStandPrem`,
                        method: 'post'
                    }).then(data => {
                        this.newStandPrem = data.data
                        if (this.newStandPrem.day.count === '') {
                            this.countday = 0
                        } else {
                            this.countday = Math.round(Number(this.newStandPrem.day.count))
                        }
                        if (this.newStandPrem.month.count === '') {
                            this.countmontht = 0
                        } else {
                            this.countmonth = Math.round(Number(this.newStandPrem.month.count))
                        }
                        if (this.newStandPrem.day.amount === 0) {
                            this.amountday = 0.0
                        } else {
                            this.amountday = (Number(this.newStandPrem.day.amount) / 10000).toFixed(2)
                        }
                        if (this.newStandPrem.month.amount === 0) {
                            this.amountmonth = 0.0
                        } else {
                            this.amountmonth = (Number(this.newStandPrem.month.amount) / 10000).toFixed(2)
                        }
                        this.flag = false
                    })
                }
            }
        },
        flag1: {
            handler (newVal, oldVal) {
                this.flag1 = newVal
                if (this.flag1) {
                    // 代收费
                    axios({
                        url: `${base.url}/waitCharge`,
                        method: 'post'
                    }).then(data => {
                        this.waitCharge = data.data
                        this.waitCharge1 = ((Number(this.waitCharge.issue_prem) + Number(this.waitCharge.uw_prem) + Number(this.waitCharge.wait_prem)) / 10000).toFixed(2)
                        this.waitCharge2 = Math.round(Number(this.waitCharge.issue_count) + Number(this.waitCharge.uw_count) + Number(this.waitCharge.wait_count))
                        this.flag1 = false
                    })
                }
            }
        },
        flag2: {
            handler (newVal, oldVal) {
                this.flag2 = newVal
                if (this.flag2) {
                    // 当月标保
                    axios({
                        url: `${base.url}/monthStandPrem`,
                        method: 'post'
                    }).then(data => {
                        this.monthStandPrem = data.data
                        if (this.monthStandPrem.length === 0) {
                        } else {
                            for (let i = 0; i < this.monthStandPrem.length; i++) {
                                this.monthStandPrem[i].count = i + 1
                                this.monthStandPrem[i].amount = (this.monthStandPrem[i].amount / 10000).toFixed(2)
                                if (this.monthStandPrem[i].waitprem === null) {
                                    this.monthStandPrem[i].waitprem = '0.00'
                                }
                                this.monthStandPrem[i].waitprem = (this.monthStandPrem[i].waitprem / 10000).toFixed(2)
                            }
                        }
                        this.flag2 = false
                    })
                }
            }
        },
        flag3: {
            handler (newVal, oldVal) {
                this.flag3 = newVal
                if (this.flag3) {
                    // 滚动最大单
                    axios({
                        url: `${base.url}/bestOrder`,
                        method: 'post'
                    }).then(data => {
                        this.bestOrder = data.data
                        if (Number(this.bestOrder.length) > 0) {
                            for (let i = 0; i < this.bestOrder.length; i++) {
                                this.bestOrder[i].amount = (this.bestOrder[i].amount / 10000).toFixed(2) + '万元'
                            }
                        }
                        this.flag3 = false
                    })
                }
            }
        }
    },

    mounted () {
        let _this = this
        _this.timerCount[0] = setInterval(() => {
            this.flag = true
            this.flag1 = true
            this.flag2 = true
            this.flag3 = true
        }, 20000)
        // 新单标准保费
        axios({
            url: `${base.url}/newStandPrem`,
            method: 'post'
        }).then(data => {
            this.newStandPrem = data.data
            if (this.newStandPrem.day.count === '') {
                this.countday = 0
            } else {
                this.countday = Math.round(Number(this.newStandPrem.day.count))
            }
            if (this.newStandPrem.month.count === '') {
                this.countmonth = 0
            } else {
                this.countmonth = Math.round(Number(this.newStandPrem.month.count))
            }
            if (this.newStandPrem.day.amount === 0) {
                this.amountday = 0.0
            } else {
                this.amountday = (Number(this.newStandPrem.day.amount) / 10000).toFixed(2)
            }
            if (this.newStandPrem.month.amount === 0) {
                this.amountmonth = 0.0
            } else {
                this.amountmonth = (Number(this.newStandPrem.month.amount) / 10000).toFixed(2)
            }
        })
        // 代收费
        axios({
            url: `${base.url}/waitCharge`,
            method: 'post'
        }).then(data => {
            this.waitCharge = data.data
            this.waitCharge1 = ((Number(this.waitCharge.issue_prem) + Number(this.waitCharge.uw_prem) + Number(this.waitCharge.wait_prem)) / 10000).toFixed(2)
            this.waitCharge2 = Math.round(Number(this.waitCharge.issue_count) + Number(this.waitCharge.uw_count) + Number(this.waitCharge.wait_count))
        })
        // 当月标保
        axios({
            url: `${base.url}/monthStandPrem`,
            method: 'post'
        }).then(data => {
            this.monthStandPrem = data.data
            if (this.monthStandPrem.length === 0) {
            } else {
                for (let i = 0; i < this.monthStandPrem.length; i++) {
                    this.monthStandPrem[i].count = i + 1
                    this.monthStandPrem[i].amount = (this.monthStandPrem[i].amount / 10000).toFixed(2)
                    if (this.monthStandPrem[i].waitprem === null) {
                        this.monthStandPrem[i].waitprem = '0.00'
                    }
                    this.monthStandPrem[i].waitprem = (this.monthStandPrem[i].waitprem / 10000).toFixed(2)
                }
            }
        })
        // 滚动最大单
        axios({
            url: `${base.url}/bestOrder`,
            method: 'post'
        }).then(data => {
            this.bestOrder = data.data
            if (Number(this.bestOrder.length) > 0) {
                for (let i = 0; i < this.bestOrder.length; i++) {
                    this.bestOrder[i].amount = (this.bestOrder[i].amount / 10000).toFixed(2) + '万元'
                }
            }
        })
        // 列表跳动和map弹框匹配滚动
        setTimeout(() => {
            setInterval(() => this.bb(0.36), 3000)
        }, 1500)
    },

    methods: {
        setTime () {
            const myDate = new Date()
            this.myDate = myDate
            /* eslint prefer-template: "off" */
            /* eslint no-useless-concat: "off" */
            const getMonth = this.addZero(Number(myDate.getMonth() + 1))
            const getMinutes = this.addZero(Number(myDate.getMinutes()))
            this.innerHTML = '北京时间' + ' ' + myDate.getFullYear() + '-' + getMonth + '-' + this.addZero(myDate.getDate()) + ' ' + this.addZero(myDate.getHours()) + ':' + getMinutes + ':' + this.addZero(myDate.getSeconds())
        },
        addZero (d) {
            if (d < 10) {
                return '0' + d
            } else {
                return d
            }
        },
        bb (val) {
            this.top -= val * 100 / 100
            this.current = Math.floor(Number((-this.top / val - 1).toFixed(0)))
            if (this.top < -this.monthStandPrem.length * 0.36) {
                this.top = 0
            }
        },
        showMarquee () {
            this.show = true
            setTimeout(() => {
                if (this.bestOrder !== '') {
                    this.bestOrder.push(this.bestOrder[0])
                    this.bestOrder.shift()
                    this.show = false
                }
            }, 500)
        }
    }
}
</script>

<style lang="scss" scoped>
.viewData{
    width: 100%;
}

.title{
    width: 96%;
    margin: 0 auto;
}

.title>ul{
    display: flex;
    padding: 0.12rem 0;
    box-sizing: border-box;
    border: 0.01rem solid #446FDA;
    box-shadow: 0.01rem 0.01rem 0.2rem #446FDA inset;
    border-radius: 0.05rem;
}

.title>ul>li{
    flex: 1;
    text-align: center;
    color: #E5C631;
}

.title1{
    font-size: 0.32rem;
    display: block;
    font-weight: 700;
    letter-spacing: 0.02rem;
    z-index: 200;
}

.title2{
    display: block;
    font-size: 0.28rem;
    font-weight: 700;
    letter-spacing: 0.02rem;
}

.marquee div{
    display: flex;
    box-sizing: border-box;
    margin: 0 auto;
    z-index: 200;
}

.marquee {
    margin-top: 0.4rem;
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    align-items: center;
    color: #3A3A3A;
    display: flex;
    box-sizing: border-box;
    color: #E5C631;
}

.marquee_box {
    display: block;
    position: relative;
    width: 100%;
    height: 0.3rem;
    overflow: hidden;
}

.marquee_list {
    position: absolute;
    display: block;
    left: 22%;
}

.marquee_top {
    margin-top: -0.3rem;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    -moz-transition: all 0.5s;
}

.marquee_list li {
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.2rem;
}

.timeStamp{
    position: relative;
    position: absolute;
    bottom: 5%;
    width: 100%;
    box-sizing: border-box;
    height: 0.26rem;
    line-height: 0.26rem;
    color: #fff;
    font-size: 0.16rem;
}

#time{
    position: absolute;
    right: 5%;
    display: block;
    text-align: right;
}

.lists {
    position: absolute;
    top: 30%;
    right: 2%;
    width: 2.8rem;
    height: 4.6rem;
}

.lists>p{
    font-size: 0.18rem;
    color:#E5C631;
}

.wangBox{
    margin-top: 0.08rem;
    background: url(../../assets/image/list.png) no-repeat;
    background-size: contain;
    width: 2.8rem;
    height: 4.6rem;
}

.daily {
    font-size: 0.18rem;
    color: #E5C631;
    width: 100%;
    font-weight: bold;
    padding-top: 0.08rem;
}

.wang {
    width: 100%;
    height: 3.9rem;
    text-align: center;
    overflow: hidden;
    color: white;
}

.wang ul li {
    display: flex;
    line-height: 0.36rem;
    height: 0.36rem;
    font-size: 0.16rem;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    &.active {
      color: #E5C631;
    }
}

.wang ul li span:nth-child(1){
    width: 15%;
}

.wang ul li span:nth-child(2) {
    width: 25%;
}

.wang ul li span:nth-child(3){
    width: 30%;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}

.wang ul li span:nth-child(4){
    width: 26%;
}
</style>
