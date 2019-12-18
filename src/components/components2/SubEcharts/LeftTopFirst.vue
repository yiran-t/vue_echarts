<!--
 * @Author: your name
 * @Date: 2019-10-28 15:30:22
 * @LastEditTime: 2019-12-11 16:11:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \five\work_today\demo\src\views\Sub.vue
 -->
<template>
    <div id="leftBox1">
      <!-- 标题 -->
      <div class="title">
        <img src="../../../assets/image/little01.png" alt="大单排名标题">
        <p>大单排名 <i style="font-size: 0.2rem">(单位:万元)</i></p>
      </div>
      <div class="wrap3"></div>
      <!-- eCharts  大单排名 -->
      <div class="wrap2">
          <!-- 标题 -->
          <ul class="listTitle">
            <li style="width: 15%">名次</li>
            <li style="width: 55%">机构</li>
            <li style="width: 30%">新单标保</li>
          </ul>
          <!-- 数据列表 -->
          <div class="dataList">
            <ul class="rank" :style="{marginTop:top+'rem'}">
                <li v-for="(item,index) in tableAll" :key="index">
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
            arr1: [],
            list: '',
            tableAll: {},
            flag: false,
            top: 0,
            bigOrderss: [
                [{
                    amount: '',
                    id: '',
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
            ]
        }
    },

    methods: {
        bb (val) {
            this.top -= val * 100 / 100
            if (this.top < -(this.tableAll.length - 1) * 1) {
                this.top = 0
            }
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
                        url: `${base.url}/bigOrder?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.tableAll = data.data
                        data.data.map((item, index) => {
                            item.id = index + 1
                            this.tableAll[index].amount = (this.tableAll[index].amount / 10000).toFixed(2)
                        })
                    })
                }
            }
        }
    },

    mounted () {
        let _this = this
        _this.timerCount[0] = setInterval(() => {
            this.flag = true
        }, 20000)
        setInterval(() => this.bb(0.9), 4000)
        // 大单排名
        this.comcode = localStorage.getItem('orgs')
        axios({
            url: `${base.url}/bigOrder?comcode=${_this.comcode}`,
            method: 'post'
        }).then(data => {
            this.tableAll = data.data
            data.data.map((item, index) => {
                this.tableAll[index].amount = (this.tableAll[index].amount / 10000).toFixed(2)
            })
        })
    }
}
</script>
<style scoped lang="scss">
#leftBox1{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 0.2rem;
    box-sizing: border-box;
    // background: pink
}

.title{
    position: relative;
    padding-top: 0.09rem;
}

.title img{
    position: absolute;
    width: 3.9rem;
    height: 0.75rem;
}

.title p{
    position: absolute;
    top: 0.22rem;
    left: 0;
    color: #fff;
    font-size: 0.38rem;
    letter-spacing: 0.02rem;
}

.wrap3{
    width: 100%;
    height: 42%;
    margin-top: 0.4rem;
}

.wrap2{
    width: 100%;
    height: 49%;
    background: url(../../../assets/image/bigList.png) no-repeat;
    background-size: 7rem 5.6rem;
    overflow: hidden;
    margin-top: 0.2rem
}

.listTitle{
    width: 100%;
    height: 16%;
    display: flex;
    margin: 0;
    padding-top: 1%;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    text-align: center;
}

.listTitle li{
    flex: 1;
}

.dataList{
    width: 100%;
    height: 96%;
    overflow: hidden;
    display: flex;
}

.data1{
    width: 100%;
    height: 100%;
}

.data2{
    width: 100%;
    height: 100%;
}

.rank {
    width: 100%;
    height: 100%;
}

.rank li {
    display: flex;
    font-size: 0.34rem;
    letter-spacing: 0.01rem;
    height: 0.91rem;
    line-height: 0.91rem;
    text-align: center;
    white-space: nowrap;
}

.rank li span{
    flex: 1;
}

</style>
