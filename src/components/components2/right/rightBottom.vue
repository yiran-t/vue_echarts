<template>
    <div class="rightBottom">
        <div id="lines1" ref="lines1" ></div>
        <el-popover
                placement="right"
                width="420"
                trigger="click" class="clickBox">
            <el-table :data="monthManPowerTK">
                <el-table-column width="110" property="comname" label="机构"></el-table-column>
                <el-table-column width="80" property="ycrl" label="月初人力"></el-table-column>
                <el-table-column width="80" property="dqrl" label="当前人力"></el-table-column>
                <el-table-column width="80" property="xzrl" label="新增人力"></el-table-column>
                <el-table-column width="80" property="tlrl" label="脱落人力"></el-table-column>
            </el-table>
            <el-button slot="reference" class="click">click 激活</el-button>
        </el-popover>
    </div>
</template>

<script>
import axios from 'axios'
import { TableColumn, Button, Table, Popover } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import base from '../../../untils/base.js'
const echarts = require('echarts')

export default {
    data () {
        return {
            linesChart: {},
            monthManPower: '',
            monthManPowerTK: [],
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
    },
    watch: {
        flag: {
            handler (newVal, oldVal) {
                this.flag = newVal
                if (this.flag) {
                    // 数据请求当月人力
                    axios({
                        url: `${base.url}/monthManPower`,
                        method: 'post'
                    }).then(data => {
                        this.monthManPower = data.data
                        this.lines1()
                        this.flag = false
                    })
                }
            }
        },
        flag1: {
            handler (newVal, oldVal) {
                this.flag1 = newVal
                if (this.flag1) {
                    // 当月人力弹框
                    axios({
                        url: `${base.url}/monthManPowerTK`,
                        method: 'post'
                    }).then(data => {
                        this.monthManPowerTK = data.data
                        this.lines1()
                        this.flag1 = false
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
        }, 10000)
        this.lines1()
        // 数据请求当月人力
        axios({
            url: `${base.url}/monthManPower`,
            method: 'post'
        }).then(data => {
            this.monthManPower = data.data
            this.lines1()
        })
        // 当月人力弹框
        axios({
            url: `${base.url}/monthManPowerTK`,
            method: 'post'
        }).then(data => {
            this.monthManPowerTK = data.data
            _this.lines1()
        })
    },
    methods: {
        lines1 () {
            let linesChart = echarts.init(this.$refs.lines1)
            let monthManPower = this.monthManPower
            let xzrl = monthManPower.xzrl
            let ycrl = monthManPower.ycrl
            let tlrl = monthManPower.tlrl
            let dqrl = monthManPower.dqrl
            linesChart.setOption({
                grid: {
                    top: '18%',
                    left: '5%',
                    bottom: '8%',
                    right: '5%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['月初', '当前', '新增', '脱落'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle: {
                        color: '#82b0ec'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#fff',
                            fontSize: '14'
                        }
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        formatter: '{value}'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                }],
                series: [{
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [38, 12, 12, 24],
                    symbolOffset: [0, -5, 13, 5],
                    symbolPosition: 'end',
                    z: 12,
                    label: { // 文字
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                            color: '#fff',
                            fontSize: '14'
                        }
                    },
                    data: [
                        { value: ycrl, itemStyle: { color: '#93458A' } },
                        { value: dqrl, itemStyle: { color: '#5527B9' } },
                        { value: xzrl, itemStyle: { color: '#446FDA' } },
                        { value: tlrl, itemStyle: { color: '#8D68D3' } }
                    ]
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [38, 12, 12, 24], // 下
                    symbolOffset: [0, 5, 13, 5],
                    z: 12,
                    data: [
                        { value: ycrl, itemStyle: { color: '#93458A' } },
                        { value: dqrl, itemStyle: { color: '#5527B9' } },
                        { value: xzrl, itemStyle: { color: '#446FDA' } },
                        { value: tlrl, itemStyle: { color: '#8D68D3' } }
                    ]
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [0, 0], // 下面光圈
                    symbolOffset: [0, 15],
                    z: 10,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                            borderColor: '#14b1eb',
                            borderType: 'dashed',
                            borderWidth: 5
                        }
                    },
                    data: [xzrl, ycrl, tlrl, dqrl]
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            // color: '#fff',
                            opacity: 0.7
                        }
                    },
                    barWidth: '38', // 中间柱子
                    data: [
                        { value: ycrl, itemStyle: { color: '#93458A' } },
                        { value: dqrl, itemStyle: { color: '#5527B9' } },
                        { value: xzrl, itemStyle: { color: '#446FDA' } },
                        { value: tlrl, itemStyle: { color: '#8D68D3' } }
                    ]
                }
                ]
            })
            window.onresize = linesChart.resize
        }
    }
}
</script>

<style scoped lang="scss">
.rightBottom{
    position: relative;
    width: 100%;
    height: 100%;
}
.title {
    display: flex;
    color: #fff;
    font-size: 0.16rem;
    text-align: center;
    padding-top: 3%;
    box-sizing: border-box;
}

.title>span{
    flex: 1;
}

.ranking {
    width: 90%;
    height: 80%;
    margin: 0 auto;
    overflow: hidden;
    padding: 2% 1%;
    box-sizing: border-box;
    /* background: red; */
}

el-carousel {
    width: 100%;
    height: 100%;
}

el-carousel-item {
    width: 100%;
    height: 100%;
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
    font-size: 0.14rem;
    height: 2.4vh;
    line-height: 2.4vh;
    text-align: center;
}

.ranking ul li:nth-of-type(n+2) {
    margin-top: 2%;
}
.ranking ul li span{
    flex: 1;
}

.rightTop {
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
#lines1{
    width: 100%;
    height: 100%;
}
.clickBox{
    position: absolute;
    top: 10%;
    left: 6%;
    z-index: 200;
    display: inline-block;
    height: 80%;
    width: 90%;
    opacity: 0;
}

.click{
    height: 100%;
    width: 100%;
}
.Figure{
    width: 90%;
    height: 20vh;
    color: #ffffff;
    font-size: 0.16rem;
    margin: 0 auto;
    margin-top: 0.1rem;
}
</style>
