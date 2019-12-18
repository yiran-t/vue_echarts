<!--
 * @Author: your name
 * @Date: 2019-10-28 15:30:22
 * @LastEditTime: 2019-12-17 15:40:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \five\work_today\demo\src\views\Sub.vue
 -->
 <template>
    <div class="wrap1">
        <!-- title -->
        <div class="title">
            <img src="../../../assets/image/little01.png" alt="约保件数转化率">
            <p>约保件数转化率</p>
        </div>
        <!-- 仪表盘  图片切换 -->
        <div class="con">
            <!-- 仪表盘 -->
            <div id="circle"></div>
            <el-popover placement="right" width="540" trigger="click" class="popupWidow">
                <el-table :data="gridDatas">
                    <el-table-column width="140" property="comname" label="机构" offset="100" style="margin-left: 0.2rem"></el-table-column>
                    <el-table-column width="150" property="totalsumreal" label="实际投保件数"></el-table-column>
                    <el-table-column width="150" property="totalsumpre" label="预约投保件数"></el-table-column>
                    <el-table-column width="100" property='rates' label="转化率"></el-table-column>
                </el-table>
                <el-button slot="reference" class="click">click 激活</el-button>
            </el-popover>
            <!-- 图片切换 -->
            <div class="list panelData">
                <p class="panelDataP">合计</p>
                <p class="panelDataP">件数</p>
                <ul>
                    <li>
                        <div :class="{'active':isActive1,'center': true}">
                            <span>实际投保保单</span>
                            <span>{{ totalsumreal }}</span>
                        </div>
                    </li>
                    <li>
                        <div :class="{'active':!isActive1,'center': true}">
                            <span>预约投保保单</span>
                            <span>{{ totalsumpre }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
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
            totalsumpre: '',
            insureRate: '',
            totalsumreal: '',
            isActive1: 1,
            gridDatas: [],
            rates: {},
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
                        url: `${base.url}/insureRate?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.totalsumpre = data.data.totalsumpre
                        this.totalsumreal = data.data.totalsumreal
                        if (this.totalsumreal === '0') {
                            this.insureRate = '0.00'
                        } else {
                            this.insureRate = (this.totalsumreal / this.totalsumpre * 100).toFixed(2)
                        }
                        this.tap1()
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
                        url: `${base.url}/insureRateTK?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.gridDatas = data.data
                        for (let i = 0; i < this.gridDatas.length; i++) {
                            if (this.gridDatas[i].totalsumpre === '0') {
                                this.rates = 0
                                this.gridDatas[i].rates = (0).toFixed(2) + '%'
                            } else {
                                this.rates = (this.gridDatas[i].totalsumreal / this.gridDatas[i].totalsumpre).toFixed(2)
                                this.gridDatas[i].rates = (this.gridDatas[i].totalsumreal / this.gridDatas[i].totalsumpre * 100).toFixed(2) + '%'
                            }
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
        // 约保件数转化率
        this.comcode = localStorage.getItem('orgs')
        axios({
            url: `${base.url}/insureRate?comcode=${_this.comcode}`,
            method: 'post'
        }).then(data => {
            this.totalsumpre = data.data.totalsumpre
            this.totalsumreal = data.data.totalsumreal
            if (this.totalsumreal === '0') {
                this.insureRate = '0.00'
            } else {
                this.insureRate = (this.totalsumreal / this.totalsumpre * 100).toFixed(2)
            }
            this.tap1()
        })
        // 转化率弹框
        // totalsumreal实际投保件数 totalsumpre预约投保件数 comname机构
        axios({
            url: `${base.url}/insureRateTK?comcode=${_this.comcode}`,
            method: 'post'
        }).then(data => {
            this.gridDatas = data.data
            for (let i = 0; i < this.gridDatas.length; i++) {
                if (this.gridDatas[i].totalsumpre === '0') {
                    this.rates = 0
                    this.gridDatas[i].rates = (0).toFixed(2) + '%'
                } else {
                    this.rates = (this.gridDatas[i].totalsumreal / this.gridDatas[i].totalsumpre).toFixed(2)
                    this.gridDatas[i].rates = (this.gridDatas[i].totalsumreal / this.gridDatas[i].totalsumpre * 100).toFixed(2) + '%'
                }
            }
        })
    },
    methods: {
        tap1 () {
            const myChart = echarts.init(document.getElementById('circle'))
            var placeHolderStyle = {
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
            let insureRate = this.insureRate
            var dataStyle = {
                normal: {
                    formatter: insureRate + '%',
                    position: 'center',
                    show: true,
                    textStyle: {
                        fontSize: '22',
                        fontWeight: 'normal',
                        color: '#fff'
                    }
                }
            }
            myChart.setOption({
                title: [
                    {
                        text: '件数转化率',
                        left: '47%',
                        top: '74%',
                        textAlign: 'center',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: '14',
                            textAlign: 'center'
                        }
                    }],
                series: [
                    {
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
                            value: 12,
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
                    }
                ]
            })
        }
    }
}
</script>
<style scoped lang="scss">
.wrap1 {
    width: 100%;
    height: 100%;
    padding-top: 0.2rem;
    box-sizing: border-box;
}

.title {
    position: relative;
    width: 100%;
    height: 1rem;
}

.title img{
    position: absolute;
    top: 0.1rem;
    left: 0;
    width: 4rem;
    height: 0.8rem;
}

.title p{
    position: absolute;
    top: 0.29rem;
    font-size: 0.38rem;
    letter-spacing: 0.02rem;
}
// 内容 echarts和图片切换
.con {
    width: 100%;
    height: 80%;
    display: flex;
}
// echarts
#circle {
    width: 50%;
    height: 70%;
    margin-top: 0.3rem;
    display: flex;
    // background: orange
}
// 弹框
.popupWidow {
    width: 50%;
    height: 26.5%;
    position: absolute;
}

.click {
    width: 100%;
    height: 100%;
    opacity: 0;
}

.panelData {
    position: absolute;
    left: 45%;
    flex-direction: row;
    width: 50%;
    height: 32%;
    padding-top: 0.2rem;
    box-sizing: border-box;
}

.panelDataP{
    color: #ffffff;
    font-size: 0.32rem;
}

.panelDataP:nth-child(2){
    margin-top: 5%;
}

.panelData>ul{
    width: 100%;
    height: 62%;
    overflow: hidden;
    box-sizing: border-box;
    margin-top: 0.08rem;
}

.panelData>ul>li{
    display: flex;
    width: 100%;
    height: 46%;
}

.panelData>ul>li>div{
    position: relative;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background: url("../../../assets/image/little02.png") no-repeat center;
    background-size: 100%;
}

.active {
    width: 70%;
    background-image: url("../../../assets/image/little03.png")!important;
}

.panelData>ul>li>div>span:nth-child(1){
    position: absolute;
    top: 30%;
    display: inline-block;
    color: #ffffff;
    font-size: 0.28rem;
}
.panelData>ul>li>div>span:nth-child(2){
    position: absolute;
    top: 28%;
    right: 10%;
    display: inline-block;
    color: #ffffff;
    font-size: 0.36rem;
}
</style>
<style>
    .el-table th>.cell {
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        vertical-align: middle;
        text-align: center;
        width: 100%;
    }
    .el-table td, .el-table th {
        padding: 2px 0;
        min-width: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        text-align: left;
    }
</style>
