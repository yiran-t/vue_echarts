<!--
 * @Author: your name
 * @Date: 2019-10-28 15:30:22
 * @LastEditTime: 2019-12-13 14:05:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \five\work_today\demo\src\views\Sub.vue
 -->
 <template>
    <!-- <div> -->
    <el-row id="leftTopSecondBox">
        <!-- 标题 -->
        <div class="title">
            <img src="../../assets/image/little01.png" alt="当月人力">
            <p>当月人力 <i style="font-size: 0.12rem">(单位:人)</i></p>
        </div>
        <div id="monthEchart" ref="monthEchart"></div>
        <!-- 下转事件 -->
        <el-popover placement="left" width="500" trigger="click" class="popupWidow">
                <el-table :data="gridData">
                    <el-table-column width="160" property="comname" label="机构"></el-table-column>
                    <el-table-column width="85" property="ycrl" label="月初人力"></el-table-column>
                    <el-table-column width="85" property="dqrl" label="当前人力"></el-table-column>
                    <el-table-column width="85" property="xzrl" label="新增人力" offset="100"></el-table-column>
                    <el-table-column width="85" property="tlrl" label="脱落人力"></el-table-column>
                </el-table>
                <el-button slot="reference" class="click"></el-button>
            </el-popover>
    </el-row>
</template>
<script>
import axios from 'axios'
import { TableColumn, Button, Table, Popover, Row } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import base from '../../untils/base.js'
const echarts = require('echarts')

export default {
    data () {
        return {
            xzrl: '',
            ycrl: '',
            tlrl: '',
            dqrl: '',
            gridData: [],
            flag: false,
            flag1: false
        }
    },
    components: {
        'el-popover': Popover,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-button': Button,
        'el-row': Row
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
                        url: `${base.url}/monthManPower?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.xzrl = data.data.xzrl
                        this.ycrl = data.data.ycrl
                        this.tlrl = data.data.tlrl
                        this.dqrl = data.data.dqrl
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
                    axios({
                        url: `${base.url}/monthManPowerTK?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.gridData = data.data
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
        //  党月人力
        this.comcode = localStorage.getItem('orgs')
        let that = this
        axios({
            url: `${base.url}/monthManPower?comcode=${that.comcode}`,
            method: 'post'
        }).then(data => {
            this.xzrl = data.data.xzrl
            this.ycrl = data.data.ycrl
            this.tlrl = data.data.tlrl
            this.dqrl = data.data.dqrl
            this.monthE()
        })
        // 当月人力弹框
        axios({
            url: `${base.url}/monthManPowerTK?comcode=${that.comcode}`,
            method: 'post'
        }).then(data => {
            this.gridData = data.data
        })
    },
    methods: {
        monthE () {
            let xzrl = this.xzrl
            let ycrl = this.ycrl
            let tlrl = this.tlrl
            let dqrl = this.dqrl
            let linesChart = echarts.init(this.$refs.monthEchart)
            linesChart.setOption({
                grid: {
                    top: '15%',
                    left: '5%',
                    bottom: '5%',
                    right: '7%',
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
                    symbolSize: [40, 12, 12, 24],
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
                    symbolSize: [40, 12, 12, 24], // 下
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
                    data: [ycrl, dqrl, xzrl, tlrl]
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            opacity: 0.7
                        }
                    },
                    barWidth: '40', // 中间柱子
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
#leftTopSecondBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
/* 标题 */
.title {
    position: relative;
    width: 100%;
    height: 100%;
    height: 0.4rem;
}
.title img{
    position: absolute;
    width: 75%;
    height: 0.4rem;
}
.title p{
    position: absolute;
    top: 0.04rem;
    color: #fff;
    font-size: 0.2rem;
    letter-spacing: 0.03rem
}

#monthEchart {
    width: 100%;
    height: 80%;
}
.popupWidow {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2000;
    opacity: 0;
    top: 0;
    left: 0;
}
.click {
    width: 100%;
    height: 100%;
}
</style>
