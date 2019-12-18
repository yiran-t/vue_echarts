<template>
    <div class="topTower">
        <div class="myPanel1" id="conversRate"></div>
        <el-popover
                placement="right"
                width="470"
                trigger="click" class="clickBox">
            <el-table :data="insureRateTK">
                <el-table-column width="120" property="comname" label="机构"></el-table-column>
                <el-table-column width="125" property="totalsumreal" label="实际投保件数"></el-table-column>
                <el-table-column width="125" property="totalsumpre" label="预约投保件数"></el-table-column>
                <el-table-column width="100" property="onversionRate" label="转化率"></el-table-column>
            </el-table>
            <el-button slot="reference" class="click">click 激活</el-button>
        </el-popover>
        <div class="panelData">
            <p class="panelDataP">合计</p>
            <p class="panelDataP">件数</p>
            <ul>
                <li>
                    <div :class="{'active':isActive1,'center': true}">
                        <span>实际投保保单</span>
                        <span>{{insureRate.totalsumreal}}</span>
                    </div>
                </li>
                <li>
                    <div :class="{'active':!isActive1,'center': true}">
                        <span>预约投保保单</span>
                        <span>{{insureRate.totalsumpre}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// import echarts from 'echarts'
import axios from 'axios'
import base from '../../untils/base.js'
import { TableColumn, Button, Table, Popover } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const echarts = require('echarts')

export default {
    data () {
        return {
            isActive1: 0,
            insureRate: [],
            insureRateTK: [],
            flag: false,
            flag1: false
        }
    },
    components: {
        'el-popover': Popover,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-button': Button
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
        window.onresize = null
    },

    watch: {
        flag: {
            handler (newVal, oldVal) {
                this.flag = newVal
                if (this.flag) {
                    // 约保件数转化率
                    axios({
                        url: `${base.url}/insureRate`,
                        method: 'post'
                    }).then(data => {
                        this.insureRate = data.data
                        this.conversRate()
                        this.flag = false
                    })
                }
            }
        },
        flag1: {
            handler (newVal, oldVal) {
                this.flag1 = newVal
                if (this.flag1) {
                    axios({
                        url: `${base.url}/insureRateTK`,
                        method: 'post'
                    }).then(data => {
                        this.insureRateTK = data.data
                        for (let i = 0; i < data.data.length; i++) {
                            if (this.insureRateTK[i].totalsumpre === '0') {
                                this.insureRateTK[i].onversionRate = '0.00' + '%'
                            } else {
                                this.insureRateTK[i].onversionRate = (Number(this.insureRateTK[i].totalsumreal) / Number(this.insureRateTK[i].totalsumpre) * 100).toFixed(2) + '%'
                            }
                        }
                        this.flag1 = false
                    })
                }
            }
        }
    },

    mounted () {
        setInterval(() => {
            this.isActive1 = this.isActive1 === 1 ? 0 : 1
        }, 1000)
        let _this = this
        _this.timerCount[0] = setInterval(() => {
            this.flag = true
            this.flag1 = true
        }, 20000)
        // 约保件数转化率
        axios({
            url: `${base.url}/insureRate`,
            method: 'post'
        }).then(data => {
            this.insureRate = data.data
            this.conversRate()
        })
        axios({
            url: `${base.url}/insureRateTK`,
            method: 'post'
        }).then(data => {
            this.insureRateTK = data.data
            for (let i = 0; i < data.data.length; i++) {
                if (this.insureRateTK[i].totalsumpre === '0') {
                    this.insureRateTK[i].onversionRate = '0.00' + '%'
                } else {
                    this.insureRateTK[i].onversionRate = (Number(this.insureRateTK[i].totalsumreal) / Number(this.insureRateTK[i].totalsumpre) * 100).toFixed(2) + '%'
                }
            }
        })
    },

    methods: {
        conversRate () {
            let insureRate = ''
            if (this.insureRate.totalsumpre === '0') {
                insureRate = '0.00'
            } else {
                insureRate = ((Number(this.insureRate.totalsumreal) / Number(this.insureRate.totalsumpre)) * 100).toFixed(2)
            }
            const myChart = echarts.init(document.getElementById('conversRate'))
            let placeHolderStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0,0,0,0)',
                    borderWidth: 0
                },
                emphasis: {
                    color: 'rgba(0,0,0,0)',
                    borderWidth: 0
                }
            }

            let dataStyle = {
                normal: {
                    formatter: insureRate + '%',
                    position: 'center',
                    show: true,
                    textStyle: {
                        fontSize: '24',
                        fontWeight: 'normal',
                        color: '#fff'
                    }
                }
            }
            myChart.setOption({
                title: [{
                    text: '件数转化率',
                    left: '47%',
                    top: '70%',
                    textAlign: 'center',
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'normal',
                        fontSize: '12',
                        textAlign: 'center'
                    }
                }],
                series: [{
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['78%', '71%'],
                    center: ['50%', '50%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                        value: 20,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#9f3edd'
                                }, {
                                    offset: 1,
                                    color: '#4897f6'
                                }])
                            }
                        },
                        label: dataStyle
                    }, {
                        value: 80,
                        itemStyle: placeHolderStyle
                    }]
                },
                // 外圈的边框
                {
                    type: 'pie',
                    hoverAnimation: false, // 鼠标经过的特效
                    radius: ['91%', '92%'],
                    center: ['30%', '50%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    }
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['71%', '73%'],
                    center: ['50%', '50%'],
                    startAngle: 225,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data: [{
                        value: 75,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#4897f6'
                                }, {
                                    offset: 1,
                                    color: '#9f3edd'
                                }])
                            }
                        }
                    }, {
                        value: 25,
                        itemStyle: placeHolderStyle
                    }]
                }]
            })
            window.onresize = myChart.resize
        }
    }
}
</script>

<style scoped lang="scss">
.topTower {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
}

.myPanel1 {
    flex-direction: row;
    width: 47%;
    height: 100%;
}

.panelData {
    position: absolute;
    left: 43%;
    flex-direction: row;
    width: 50%;
    height: 100%;
    padding-top: 0.2rem;
    box-sizing: border-box;
}

.panelDataP{
    color: #ffffff;
    font-size: 0.18rem;
}

.panelDataP:nth-child(2){
    margin-top: 5%;
}

.panelData>ul{
    width: 100%;
    height: 80%;
    overflow: hidden;
    box-sizing: border-box;
    margin-top: 0.08rem;
}

.panelData>ul>li{
    display: flex;
    width: 100%;
    height: 26%;
}

.panelData>ul>li>div{
    position: relative;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background: url("../../assets/image/little02.png") no-repeat center;
    background-size: 100%;
}

.active {
    width: 70%;
    background-image: url("../../assets/image/little03.png")!important;
}

.panelData>ul>li>div>span:nth-child(1){
    position: absolute;
    top: 10%;
    height: 100%;
    line-height: 200%;
    display: inline-block;
    color: #ffffff;
    font-size: 0.16rem;
}

.panelData>ul>li>div>span:nth-child(2){
    position: absolute;
    top: 0;
    right: 5%;
    height: 100%;
    line-height: 200%;
    display: inline-block;
    color: #ffffff;
    font-size: 0.2rem;
}

.clickBox{
    position: absolute;
    top: 11%;
    left: 6%;
    z-index: 200;
    opacity: 0;
}

.click{
    height: 1.54rem;
    width: 1.54rem;
    border-radius: 50%;
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
