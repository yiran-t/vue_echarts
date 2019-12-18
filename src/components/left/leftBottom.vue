<template>
    <div class="pic">
        <ul>
            <li :class="{'active':isActive1,'clearfix': true}">
                <div class="sub_title">投保人客户</div>
                <div class="sub_data">{{customerNum.totalappnt}}</div>
            </li>
            <li :class="{'active':!isActive1,'clearfix': true}">
                <div class="sub_title">被保人客户</div>
                <div class="sub_data">{{customerNum.totalinsured}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import base from '../../untils/base.js'

export default {
    data () {
        return {
            isActive1: 0,
            customerNum: '',
            flag: false
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
                    axios({
                        url: `${base.url}/customerNum`,
                        method: 'post'
                    }).then(data => {
                        this.customerNum = data.data
                        this.flag = false
                    })
                }
            }
        }
    },

    mounted () {
        let _this = this
        _this.timerCount[0] = setInterval(() => {
            this.isActive1 = this.isActive1 === 1 ? 0 : 1
        }, 1000)
        _this.timerCount[1] = setInterval(function () {
            _this.flag = true
        }, 20000)
        axios({
            url: `${base.url}/customerNum`,
            method: 'post'
        }).then(data => {
            this.customerNum = data.data
        })
    }
}
</script>

<style scoped lang='scss'>
.pic {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
}

.pic>ul {
    width: 100%;
}

.pic>ul>li{
    display: flex;
    display: -webkit-flex;
    display: block;
    width: 90%;
    height: 60%;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
    color: white;
    font-size: 0.16rem;
    background: url("../../assets/image/little02.png") no-repeat center;
    background-size: 100%;
    padding: 4% 0;
    box-sizing: border-box;
}

.pic>ul>li:nth-child(2) {
    margin-top: 10%;
}

.sub_title {
    display: inline-block;
    width: 80%;
    box-sizing: border-box;
    font-size: 0.16rem;
    padding-left: 6%;
    box-sizing: border-box;
}

.sub_data {
    width: 20%;
    padding-right: 6%;
    box-sizing: border-box;
    display: inline-block;
    padding-right: 0.1rem;
    box-sizing: border-box;
    font-size: 0.2rem;
}

.active {
    width: 90%;
    background-image: url("../../assets/image/little03.png")!important;
}

</style>
