<template>
    <div class="rightTop">
        <div class="Figure"></div>
        <div class="bigList">
            <div class="title">
                <span>名次</span>
                <span>机构</span>
                <span>新单标保</span>
            </div>
            <div class="ranking">
                <ul class="rank" :style="{marginTop:top+'rem'}">
                  <li v-for="(item,index) in bigOrder" :key="index">
                      <span>{{index + 1}}</span>
                      <span>{{item.comname}}</span>
                      <span>{{item.amount}}</span>
                  </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import base from '../../../untils/base.js'

export default {
    data () {
        return {
            bigOrder: [],
            bigOrders: [],
            flag: false,
            bigOrderss: [
                [{
                    amount: '',
                    order: '',
                    comname: ''
                },
                {
                    amount: '',
                    order: '',
                    comname: ''
                },
                {
                    amount: '',
                    order: '',
                    comname: ''
                },
                {
                    amount: '',
                    order: '',
                    comname: ''
                },
                {
                    amount: '',
                    order: '',
                    comname: ''
                }]
            ],
            top: 0
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
        flag: {
            handler (newVal, oldVal) {
                this.flag = newVal
                if (this.flag) {
                    // 大单排名
                    axios({
                        url: `${base.url}/bigOrder`,
                        method: 'post'
                    }).then(data => {
                        this.bigOrder = data.data
                        for (let i = 0; i < this.bigOrder.length; i++) {
                            this.bigOrder[i].amount = (this.bigOrder[i].amount / 10000).toFixed(2)
                        }
                        this.flag = false
                    })
                }
            }
        }
    },
    methods: {
        bb (val) {
            this.top -= val * 100 / 100
            // this.current = Math.ceil(-this.top / val - 1)
            if (this.top < -(this.bigOrder.length - 1) * 1) {
                this.top = 0
            }
        }
    },

    mounted () {
        const _this = this
        _this.timerCount[0] = setInterval(() => {
            this.flag = true
        }, 20000)
        // 大单排名
        axios({
            url: `${base.url}/bigOrder`,
            method: 'post'
        }).then(data => {
            this.bigOrder = data.data
            if (this.bigOrder.length === 0) {
                for (let i = 0; i < this.bigOrderss.length; i++) {
                    this.bigOrderss[i].order = ''
                    this.bigOrderss[i].amount = ''
                    this.bigOrderss[i].comname = ''
                    this.bigOrders = this.bigOrderss
                }
            }
            for (let i = 0; i < this.bigOrder.length; i++) {
                this.bigOrder[i].order = i + 1
                if (this.bigOrder[i].amount === '') {
                    this.bigOrder[i].amount = 0
                } else {
                    this.bigOrder[i].amount = (this.bigOrder[i].amount / 10000).toFixed(2)
                }
                let bigOrders = this.bigOrders
                if (this.bigOrder.length > 5) {
                    let aa = this.bigOrder.slice(0, 5)
                    let bb = this.bigOrder.slice(5, 10)
                    bigOrders.push(aa)
                    this.bigOrders.push(bb)
                } else {
                    let aa = this.bigOrder.slice(0, 5)
                    bigOrders.push(aa)
                }
            }
        })
        setInterval(() => this.bb(0.9), 4000)
    }
}
</script>
<style scoped lang="scss">
.rightTop {
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // background: yellowgreen
}

.bigList {
    width: 90%;
    // height: 100%;
    height: 30vh;
    margin: 0 auto;
    background: url(../../../assets/image/bigList.png) no-repeat;
    background-size: 7rem 5.6rem;
}

.click{
    height: 100%;
    width: 100%;
}

.Figure{
    width: 90%;
    height: 26vh;
    color: #ffffff;
    font-size: 0.16rem;
    margin: 0 auto;
    margin-top: 0.1rem;
    // background: yellow
}

.title {
    width: 90%;
    display: flex;
    margin: 0 auto;
    color: #fff;
    font-size: 0.26rem;
    text-align: center;
    padding: 3.3% 0;
    box-sizing: border-box;
}

.title>span{
    flex: 1;
}

.ranking {
    width: 90%;
    height: 77%;
    margin: 0 auto;
    overflow: hidden;
    padding: 2% 1%;
    box-sizing: border-box;
}

.ranking ul{
    float: left;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    box-sizing: border-box;
}

.ranking ul li{
    display: flex;
    color: #fff;
    font-size: 0.26rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    white-space:nowrap;
    /* background: yellow; */
}

.ranking ul li:nth-of-type(n+2) {
    margin-top: 0.5%;
}

.ranking ul li span{
    flex: 1;
}
</style>
