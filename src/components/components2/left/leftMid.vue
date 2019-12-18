<template>
    <div id="leftMid">
        <div id="lines1" ref="lines1" ></div>
        <el-popover
                placement="right"
                width="420"
                trigger="click" class="clickBox">
            <el-table :data="waitChargeTK">
                <el-table-column width="110" property="comname" label="机构"></el-table-column>
                <el-table-column width="105" property="totalwaitprem" label="待签单"></el-table-column>
                <el-table-column width="105" property="totalissueprem" label="待问题件"></el-table-column>
                <el-table-column width="100" property="totaluwprem" label="待人核"></el-table-column>
            </el-table>
            <el-button slot="reference" class="click">click 激活</el-button>
        </el-popover>
    </div>
</template>

<script>
import axios from 'axios'
import base from '../../../untils/base.js'
import { TableColumn, Button, Table, Popover } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const echarts = require('echarts')

export default {
    data () {
        return {
            waitCharge: [],
            waitChargeTK: [],
            flag: '',
            flag1: ''
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
                // 数据请求代收费
                    axios({
                        url: `${base.url}/waitCharge`,
                        method: 'post'
                    }).then(data => {
                        this.waitCharge = data.data
                        this.waitCharge.totalissueprem = (this.waitCharge.issue_prem / 10000).toFixed(2)
                        this.waitCharge.totaluwprem = (this.waitCharge.uw_prem / 10000).toFixed(2)
                        this.waitCharge.totalwaitprem = (this.waitCharge.wait_prem / 10000).toFixed(2)
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
                    // 待收费弹框
                    axios({
                        url: `${base.url}/waitChargeTK`,
                        method: 'post'
                    }).then(data => {
                        this.waitChargeTK = data.data
                        for (let i = 0; i < this.waitChargeTK.length; i++) {
                            this.waitChargeTK[i].totalissueprem = (this.waitChargeTK[i].issue_prem / 10000).toFixed(2)
                            this.waitChargeTK[i].totaluwprem = (this.waitChargeTK[i].uw_prem / 10000).toFixed(2)
                            this.waitChargeTK[i].totalwaitprem = (this.waitChargeTK[i].wait_prem / 10000).toFixed(2)
                        }
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
        }, 20000)
        // 数据请求代收费
        axios({
            url: `${base.url}/waitCharge`,
            method: 'post'
        }).then(data => {
            this.waitCharge = data.data
            this.waitCharge.totalissueprem = (this.waitCharge.issue_prem / 10000).toFixed(2)
            this.waitCharge.totaluwprem = (this.waitCharge.uw_prem / 10000).toFixed(2)
            this.waitCharge.totalwaitprem = (this.waitCharge.wait_prem / 10000).toFixed(2)
            this.lines1()
        })
        // 待收费弹框
        axios({
            url: `${base.url}/waitChargeTK`,
            method: 'post'
        }).then(data => {
            this.waitChargeTK = data.data
            for (let i = 0; i < this.waitChargeTK.length; i++) {
                this.waitChargeTK[i].totalissueprem = (this.waitChargeTK[i].issue_prem / 10000).toFixed(2)
                this.waitChargeTK[i].totaluwprem = (this.waitChargeTK[i].uw_prem / 10000).toFixed(2)
                this.waitChargeTK[i].totalwaitprem = (this.waitChargeTK[i].wait_prem / 10000).toFixed(2)
            }
        })
    },

    methods: {
        lines1 () {
            const linesChart = echarts.init(this.$refs.lines1)
            let waitCharge = this.waitCharge
            linesChart.setOption({
                legend: {
                    show: false,
                    data: ['待签单', '待问题件', '待人核'],
                    top: '1%',
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                grid: {
                    top: '25%',
                    left: '5%',
                    bottom: '20%',
                    right: '5%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['待签单', '待问题件', '待人核'],
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
                            fontSize: '11'
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
                    symbolSize: [40, 12, 12, 24],
                    symbolOffset: [0, -5, 13, 5],
                    symbolPosition: 'end',
                    z: 12,
                    barGap: '2',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c}',
                            color: '#fff',
                            fontSize: '12'
                        }
                    },
                    data: [
                        { value: waitCharge.totalwaitprem, itemStyle: { color: '#446FDA' } },
                        { value: waitCharge.totalissueprem, itemStyle: { color: '#93458A' } },
                        { value: waitCharge.totaluwprem, itemStyle: { color: '#8D68D3' } }
                    ]
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [40, 12, 12, 24],
                    symbolOffset: [0, 5, 13, 5],
                    z: 12,
                    data: [
                        { value: waitCharge.totalwaitprem, itemStyle: { color: '#446FDA' } },
                        { value: waitCharge.totalissueprem, itemStyle: { color: '#93458A' } },
                        { value: waitCharge.totaluwprem, itemStyle: { color: '#8D68D3' } }
                    ]
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [0, 0],
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
                    data: [waitCharge.totalwaitprem, waitCharge.totalissueprem, waitCharge.totaluwprem]
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            opacity: 0.7
                        }
                    },
                    barWidth: '40',
                    data: [
                        { value: waitCharge.totalwaitprem, itemStyle: { color: '#446FDA' } },
                        { value: waitCharge.totalissueprem, itemStyle: { color: '#93458A' } },
                        { value: waitCharge.totaluwprem, itemStyle: { color: '#8D68D3' } }
                    ]
                }
                ]
            })
            window.onresize = linesChart.resize
        }
    }
}
</script>

<style scoped>
#leftMid {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    flex-wrap: wrap;
}

#lines1{
    width: 100%;
    height: 100%;
}

.clickBox{
    position: absolute;
    top: 11%;
    left: 6%;
    z-index: 200;
    display: inline-block;
    height: 100%;
    width: 100%;
    opacity: 0;
}

.click{
    height: 100%;
    width: 100%;
}
</style>
