<!--
 * @Author: your name
 * @Date: 2019-10-31 19:28:25
 * @LastEditTime: 2019-11-28 18:31:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \five\work_today\pros_new\src\components\mid\viewData.vue
 -->
<template>
    <div class="viewData">
        <div class="title">
            <ul>
                <li>
                    <span class="title1">当日标保/件数</span>
                    <span class="title2">{{ day }}/{{ dayPiece }}</span>
                </li>
                <li>
                    <span class="title1">当月标保/件数</span>
                    <span class="title2">{{ month }}/{{ monthPiece }}</span>
                </li>
                <li>
                    <span class="title1">待收费/件数</span>
                    <span class="title2">{{ sumCount }}/{{ sumPiece }}</span>
                </li>
            </ul>
        </div>
        <!-- 实时更新列表 -->
        <div class="marquee">
            <div class="marquee_box">
                <ul class="marquee_list" :class="{marquee_top:show}">
                    <li v-for="(item, index) in marqueeList1" :key="index">
                        <span>{{item.comname}}</span>
                        <span class="red">{{item.agentname}}</span>
                        <span class="red">签单{{item.amount}}万元</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 当月标准保费 -->
        <div class="lists">
            <p style="margin-left: -0.42rem">当月标准保费 <i style="font-size: 0.12rem">(单位：万元)</i></p>
            <div class="wangBox">
                <p class="daily" style="box-sizing: border-box;">
                    <span style="margin-left: 0.08rem">排名</span>
                    <span style="margin-left: 0.24rem">机构</span>
                    <span style="margin-left: 0.42rem">新单标保</span>
                    <span style="margin-left: 0.2rem">待收费</span>
                </p>
                <div class="wang">
                    <ul :style="{marginTop:top+'rem'}">
                        <li v-for="(i, index) in tableData2" :key="index">
                            <span style="margin-left: 0.06rem">{{index + 1}}</span>
                            <span style="margin-left: 0.02rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{i.comname}}</span>
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
            sumCount: '',
            sumPiece: '',
            day: '',
            month: '',
            dayPiece: '',
            monthPiece: '',
            listLength: '',
            tableLength: '',
            innerHTML: '',
            animate: false,
            show: false,
            top: 0,
            orderId: {},
            marqueeList1: [],
            tableData2: [],
            // flag: false,
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false
        }
    },
    methods: {
        // map旁时间展示
        setTime () {
            const myDate = new Date()
            this.myDate = myDate
            /* eslint prefer-template: "off" */
            /* eslint no-useless-concat: "off" */
            const getMonth = this.addZero(Number(myDate.getMonth() + 1))
            const getMinutes = this.addZero(Number(myDate.getMinutes()))
            this.innerHTML = '北京时间' + ' ' + myDate.getFullYear() + '-' + getMonth + '-' + this.addZero(myDate.getDate()) + ' ' + this.addZero(myDate.getHours()) + ':' + getMinutes + ':' + this.addZero(myDate.getSeconds())
        },
        // 时间--未满10 补0
        addZero (d) {
            if (d < 10) {
                return '0' + d
            } else {
                return d
            }
        },
        // map旁列表滚动
        bb (val) {
            this.top -= val
            if (this.top < -this.tableLength * 0.37) {
                this.top = 0
            }
        },
        // 滚动最大单
        showMarquee () {
            this.show = true
            setTimeout(() => {
                let _this = this
                if (_this.marqueeList1 !== '') {
                    _this.marqueeList1.push(_this.marqueeList1[0])
                    _this.marqueeList1.shift()
                    _this.show = false
                }
            }, 500)
        }
    },
    created () {
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
    },
    watch: {
        // 新单标保
        flag1: {
            handler (newVal, oldVal) {
                this.flag1 = newVal
                if (this.flag1) {
                    axios({
                        url: `${base.url}/newStandPrem?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.day = (data.data.day.amount / 10000).toFixed(2)
                        this.month = (data.data.month.amount / 10000).toFixed(2)
                        this.dayPiece = Math.round(Number(data.data.day.count))
                        this.monthPiece = Math.round(Number(data.data.month.count))
                        this.flag1 = false
                    })
                }
            }
        },
        // 滚动最大单
        flag2: {
            handler (newVal, oldVal) {
                this.flag2 = newVal
                if (this.flag2) {
                    axios({
                        url: `${base.url}/bestOrder?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.marqueeList1 = data.data
                        if (Number(this.marqueeList1.length) > 0) {
                            for (let i = 0; i < this.marqueeList1.length; i++) {
                                this.marqueeList1[i].amount = (this.marqueeList1[i].amount / 10000).toFixed(2)
                            }
                        }
                        this.flag2 = false
                    })
                }
            }
        },
        // 当月标准保费
        flag3: {
            handler (newVal, oldVal) {
                this.flag3 = newVal
                if (this.flag3) {
                    axios({
                        url: `${base.url}/monthStandPrem?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.tableData2 = data.data
                        for (let i = 0; i < data.data.length; i++) {
                            data.data[i].waitprem = (data.data[i].waitprem / 10000).toFixed(2)
                            data.data[i].amount = (data.data[i].amount / 10000).toFixed(2)
                        }
                        this.tableLength = this.tableData2.length
                        this.flag3 = false
                    })
                }
            }
        },
        // 代收费
        flag4: {
            handler (newVal, oldVal) {
                this.flag4 = newVal
                if (this.flag4) {
                    axios({
                        url: `${base.url}/waitCharge?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.sumCount = ((Number(data.data.issue_prem) + Number(data.data.uw_prem) + Number(data.data.wait_prem)) / 10000).toFixed(2)
                        this.sumPiece = Math.round(Number(data.data.issue_count) + Number(data.data.uw_count) + Number(data.data.wait_count))
                        this.flag4 = false
                    })
                }
            }
        }
    },
    mounted () {
        setInterval(() => {
            this.showMarquee()
        }, 2000)
        let _this = this
        setInterval(() => {
            this.setTime()
        }, 1000)
        _this.timerCount[0] = setInterval(function () {
            _this.flag1 = true
            _this.flag2 = true
            _this.flag3 = true
            _this.flag4 = true
        }, 20000)
        this.comcode = localStorage.getItem('orgs')
        // 新单标准保费 newStandPrem
        setTimeout(function () {
            axios({
                url: `${base.url}/newStandPrem?comcode=${_this.comcode}`,
                method: 'post'
            }).then(data => {
                _this.day = (data.data.day.amount / 10000).toFixed(2)
                _this.month = (data.data.month.amount / 10000).toFixed(2)
                _this.dayPiece = Math.round(Number(data.data.day.count))
                _this.monthPiece = Math.round(Number(data.data.month.count))
            })
        }, 0)
        // 滚动最大单
        axios({
            url: `${base.url}/bestOrder?comcode=${_this.comcode}`,
            method: 'post'
        }).then(data => {
            this.marqueeList1 = data.data
            if (Number(this.marqueeList1.length) > 0) {
                for (let i = 0; i < this.marqueeList1.length; i++) {
                    this.marqueeList1[i].amount = (this.marqueeList1[i].amount / 10000).toFixed(2)
                }
            }
        })
        // 列表
        axios({
            url: `${base.url}/monthStandPrem?comcode=${_this.comcode}`,
            method: 'post'
        }).then(data => {
            this.tableData2 = data.data
            for (let i = 0; i < data.data.length; i++) {
                data.data[i].waitprem = (data.data[i].waitprem / 10000).toFixed(2)
                data.data[i].amount = (data.data[i].amount / 10000).toFixed(2)
            }
            this.tableLength = this.tableData2.length
        })
        setTimeout(() => {
            setInterval(() => this.bb(0.37), 4000)
        }, 0)
        // 待收费  件数
        axios({
            url: `${base.url}/waitCharge?comcode=${_this.comcode}`,
            method: 'post'
        }).then(data => {
            this.sumCount = ((Number(data.data.issue_prem) + Number(data.data.uw_prem) + Number(data.data.wait_prem)) / 10000).toFixed(2)
            this.sumPiece = Math.round(Number(data.data.issue_count) + Number(data.data.uw_count) + Number(data.data.wait_count))
        })
    }
}
</script>

<style lang="scss" scoped>
.viewData{
    width: 100%;
}
.title{
    width: 96%;
    margin: 0.3rem auto;
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
}
.title2{
    display: block;
    font-size: 0.28rem;
    font-weight: 700;
    letter-spacing: 0.02rem;
    width: 100%;
    height: 50%
}
.marquee div{
    display: flex;
    box-sizing: border-box;
    margin: 0 auto;
}
.marquee {
    margin-top: 0.4rem;
    width: 100%;
    height: 0.3rem;
    line-height: 0.2rem;
    align-items: center;
    color: #E5C631;
    display: flex;
    box-sizing: border-box;
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
    left: 18%;
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
@keyframes rowup {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(calc(-100% + 0.24rem));
    }
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
    top: 32%;
    right: 2%;
    width: 2.4rem;
    height: 4.6rem;
}
.lists>p{
    font-size: 0.18rem;
    color:#E5C631;
    margin-left: -10%;
}
.wangBox{
    margin-top: 0.1rem;
    background: url(../../assets/image/list.png) no-repeat;
    background-size: 100%;
    width: 2.9rem;
    height: 4.6rem;
    margin-left: -21%
}
.daily {
    display: flex;
    font-size: 0.16rem;
    font-weight: bold;
    color:#E5C631;
    width: 100%;
    margin: 0 auto;
    padding: 0.08rem 0;
    margin-top: 0.1rem;
    box-sizing: border-box;
    white-space:nowrap;
}
.daily>span:nth-of-type(n+2){
    margin-left: 3%;
    text-align: center;
}
.wang {
    width: 100%;
    height: 4.05rem;
    text-align: center;
    overflow: hidden;
    color: white;
}
.wang ul li {
    display: flex;
    height: 0.37rem;
    font-size: 0.16rem;
    width: 100%;
    box-sizing: border-box;
}
.wang ul li span:nth-child(1),.wang ul li span:nth-child(2) {
    width: 10%;
}
.wang ul li span:nth-child(2) {
    width: 35%;
}
.wang ul li span:nth-child(3){
    width: 25%;
}
.wang ul li span:nth-child(4){
    width: 25%;
}
</style>
