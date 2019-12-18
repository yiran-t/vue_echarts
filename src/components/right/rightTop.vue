<template>
    <div class="rightTop">
        <div class="Figure">
        </div>
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
        <div id="lines1" ref="lines1" ></div>
    </div>
</template>

<script>
import axios from 'axios'
import base from '../../untils/base.js'
// import { Carousel, CarouselItem } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

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
            if (this.top < -(this.bigOrder.length - 1) * 0.4) {
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
        setInterval(() => this.bb(0.4), 4000)
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
}

.bigList {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    background: url(../../assets/image/bigList.png) no-repeat;
    background-size: 100%;
}

#lines1{
    width: 100%;
    height: 90%;
}

.clickBox{
    position: absolute;
    top: 20%;
    left: 6%;
    z-index: 200;
    display: inline-block;
    height: 76%;
    width: 90%;
    opacity: 0;
}

.click{
    height: 100%;
    width: 100%;
}

.Figure{
    width: 90%;
    height: 22vh;
    color: #ffffff;
    font-size: 0.16rem;
    margin: 0 auto;
    margin-top: 0.1rem;
}

.title {
    width: 90%;
    display: flex;
    margin: 0 auto;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
    padding: 3.1% 0;
    box-sizing: border-box;
}

.title>span{
    flex: 1;
}

.ranking {
    width: 3.36rem;
    height: 2rem;
    overflow: hidden;
}

.ranking ul{
    float: left;
    width: 3.36rem;
    height: 4rem;
    color: #fff;
    text-align: center;
    box-sizing: border-box;
}

.ranking ul li{
    display: flex;
    color: #fff;
    margin: 0;
    font-size: 0.16rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    white-space:nowrap;
}

.ranking ul li span{
    flex: 1;
}
</style>
