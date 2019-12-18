<!--
 * @Author: your name
 * @Date: 2019-10-28 15:30:22
 * @LastEditTime: 2019-12-12 17:57:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \five\work_today\demo\src\views\Sub.vue
 -->
 <template>
    <div class="wrap1">
        <div class="title">
            <img src="../../assets/image/little01.png" alt="大单排名标题">
            <p>待收费 <i style="font-size: 0.12rem">(单位:万元)</i></p>
        </div>
        <div class="con">
            <!-- circle Echarts -->
            <el-popover placement="left" width="430" trigger="click" class="popupWidow" offset="100">
                <el-table :data="gridData">
                    <el-table-column width="130" property="comname" label="机构" offset="100"></el-table-column>
                    <el-table-column width="100" property="wait_prem" label="待签单"></el-table-column>
                    <el-table-column width="100" property="issue_prem" label="待问题件"></el-table-column>
                    <el-table-column width="100" property="uw_prem" label="待人核"></el-table-column>
                </el-table>
                <el-button slot="reference" class="click"></el-button>
            </el-popover>
            <div id="circle2" ref="circle2"></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import base from '../../untils/base.js'
import { TableColumn, Button, Table, Popover } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
const echarts = require('echarts')

export default {
    data () {
        return {
            isActive1: 1,
            gridData: [],
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
        setInterval(() => {
            this.isActive1 = this.isActive1 === 1 ? 0 : 1
        }, 1000)
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
                        url: `${base.url}/waitCharge?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.waitSigning = (data.data.wait_prem / 10000).toFixed(2)
                        this.waitProblem = (data.data.issue_prem / 10000).toFixed(2)
                        this.verification = (data.data.uw_prem / 10000).toFixed(2)
                        this.monthE()
                        this.flag = false
                    })
                }
            }
        },
        flag1: {
            handler (newVal, oldVal) {
                this.flag1 = newVal
                if (this.flag1) {
                    // 待收费 弹框 8632
                    axios({
                        url: `${base.url}/waitChargeTK?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.gridData = data.data
                        for (let i = 0; i < this.gridData.length; i++) {
                            this.gridData[i].wait_prem = (Number(this.gridData[i].wait_prem / 10000)).toFixed(2)
                            this.gridData[i].issue_prem = (Number(this.gridData[i].issue_prem / 10000)).toFixed(2)
                            this.gridData[i].uw_prem = (Number(this.gridData[i].uw_prem / 10000)).toFixed(2)
                        }
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
        // waitCharge 待收费
        this.comcode = localStorage.getItem('orgs')
        axios({
            url: `${base.url}/waitCharge?comcode=${_this.comcode}`,
            method: 'post'
        }).then(data => {
            this.waitSigning = (data.data.wait_prem / 10000).toFixed(2)
            this.waitProblem = (data.data.issue_prem / 10000).toFixed(2)
            this.verification = (data.data.uw_prem / 10000).toFixed(2)
            this.monthE()
        })
        // 待收费 弹框 8632
        axios({
            url: `${base.url}/waitChargeTK?comcode=${_this.comcode}`,
            method: 'post'
        }).then(data => {
            this.gridData = data.data
            for (let i = 0; i < this.gridData.length; i++) {
                this.gridData[i].wait_prem = (Number(this.gridData[i].wait_prem / 10000)).toFixed(2)
                this.gridData[i].issue_prem = (Number(this.gridData[i].issue_prem / 10000)).toFixed(2)
                this.gridData[i].uw_prem = (Number(this.gridData[i].uw_prem / 10000)).toFixed(2)
            }
        })
    },

    methods: {
        monthE () {
            let waitSigning = this.waitSigning
            let waitProblem = this.waitProblem
            let verification = this.verification
            let linesChart = echarts.init(this.$refs.circle2)
            linesChart.setOption({
                grid: {
                    top: '15%',
                    left: '5%',
                    bottom: '0%',
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
                    symbolSize: [46, 12, 12, 24],
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
                        { value: waitSigning, itemStyle: { color: '#446FDA' } },
                        { value: waitProblem, itemStyle: { color: '#93458A' } },
                        { value: verification, itemStyle: { color: '#8D68D3' } }
                    ]
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [46, 12, 12, 24], // 下
                    symbolOffset: [0, 5, 13, 5],
                    z: 12,
                    data: [
                        { value: waitSigning, itemStyle: { color: '#446FDA' } },
                        { value: waitProblem, itemStyle: { color: '#93458A' } },
                        { value: verification, itemStyle: { color: '#8D68D3' } }
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
                    data: [waitSigning, waitProblem, verification]
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            opacity: 0.7
                        }
                    },
                    barWidth: '46', // 中间柱子
                    data: [
                        { value: waitSigning, itemStyle: { color: '#446FDA' } },
                        { value: waitProblem, itemStyle: { color: '#93458A' } },
                        { value: verification, itemStyle: { color: '#8D68D3' } }
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
.wrap1 {
    width: 100%;
    height: 100%;
}
.title {
    width: 100%;
    height: 0.4rem;
    display: flex;
    flex-direction: column;
}
.title img {
    width: 80%;
    height: 0.4rem;
}
.title p{
    font-size: 0.22rem;
    margin-top: -0.35rem;
    letter-spacing: 0.02rem;
}
.listUl{
    height: 8%;
    font-size: 0.16rem;
    margin-left: 0.3rem;
    margin-top: 0.2rem;
    display: flex;
}
.listUl li{
    display: flex;
    width: 30%;
}
.con {
    width: 100%;
    height: 79%;
    display: flex;
}
.popupWidow {
    width: 21%;
    height: 22%;
    position: absolute;
    z-index: 2000;
    opacity: 0;
    /* background: pink; */
}
.click {
    width: 100%;
    height: 100%;
}
#circle2 {
    width: 100%;
    height: 100%;
}
</style>
