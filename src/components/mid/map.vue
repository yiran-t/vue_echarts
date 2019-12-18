<template>
    <div class="box">
        <div id="map2d"></div>
        <div class="dropBox" v-show="choose">
            <ul>
                <li v-for="item in city" :key="item.id" @click="bounced(item.Name,item.Comcode)" data-comcode="{item.Comcode}">{{item.Name}}</li>
            </ul>
        </div>
        <div id="histogram"></div>
    </div>
</template>

<script>
import axios from 'axios'
import base from '../../untils/base.js'
const echarts = require('echarts')
require('echarts-gl')
require('echarts/map/js/china')

export default {
    data () {
        return {
            monthStandPrem: '',
            aa: '',
            bb: '',
            getComcode: '',
            provinceValue: '',
            choose: false,
            city: [
                {
                    id: 0,
                    Name: '',
                    Comcode: ''
                },
                {
                    id: 1,
                    Name: '',
                    Comcode: ''
                }
            ],
            cityAmountD: '',
            cityAmountN: '',
            cityAmountX: '',
            cityDayD: '',
            cityDayN: '',
            cityDayX: '',
            dalianComcode: '',
            ningboComcode: '',
            xiamenComcode: '',
            xiaoganComcode: '',
            suihuaComcode: '',
            flag: false,
            flag1: false,
            count: -1,
            count2: 0,
            comname1: '',
            comname2: '',
            comname3: '',
            amount1: '',
            amount2: '',
            amount3: '',
            myChart: ''
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
        window.onresize = null
    },

    mounted () {
        axios({
            url: `${base.url}/monthStandPrem`,
            method: 'post'
        }).then(data => {
            this.monthStandPrem = data.data
            this.Data = data.data
            this.amount1 = data.data[0].amount
            this.amount2 = data.data[1].amount
            this.amount3 = data.data[2].amount
            this.comname1 = data.data[0].comname
            this.comname2 = data.data[1].comname
            this.comname3 = data.data[2].comname
            if (this.monthStandPrem.length > 0) {
                for (let i = 0; i < this.monthStandPrem.length; i++) {
                    this.monthStandPrem[i].count = i + 1
                    this.monthStandPrem[i].amount = (Number(this.monthStandPrem[i].amount) / 10000).toFixed(2) + '万'
                    if (this.monthStandPrem[i].waitprem === null) {
                        this.monthStandPrem[i].waitprem = ''
                    }
                    this.monthStandPrem[i].waitprem = (this.monthStandPrem[i].waitprem / 10000).toFixed(2) + '万'
                }
                this.echarts()
                this.histogram()
            } else {
                this.echarts()
                this.histogram()
            }
        })
        // 编码接口
        axios({
            url: `${base.url}/getComcode`,
            method: 'post'
        }).then(data => {
            this.getComcode = data.data
        })
        setInterval(() => {
            this.choose = false
        }, 20000)
    },

    methods: {
        // 点击弹框进入下转页
        bounced (Name, Comcode) {
            localStorage.setItem('myComCode', Name)
            localStorage.setItem('orgs', Comcode)
            this.$router.push({ path: '/sub' })
        },
        echarts () {
            // const this.myChart = echarts.init(document.getElementById('map2d'))
            this.myChart = echarts.init(document.getElementById('map2d'))
            let monthStandPrem = this.monthStandPrem
            let comname1 = ''
            let comname2 = ''
            let comname3 = ''
            let totalNumber = []
            if (monthStandPrem.length > 0) {
                if (monthStandPrem[0].comname === '大连') {
                    comname1 = '辽宁'
                    comname2 = monthStandPrem[1].comname
                    comname3 = monthStandPrem[2].comname
                } else if (monthStandPrem[0].comname === '宁波') {
                    comname1 = '浙江'
                    comname2 = monthStandPrem[1].comname
                    comname3 = monthStandPrem[2].comname
                } else if (monthStandPrem[0].comname === '厦门') {
                    comname1 = '福建'
                    comname2 = monthStandPrem[1].comname
                    comname3 = monthStandPrem[2].comname
                }
                if (monthStandPrem[1].comname === '大连') {
                    comname2 = '辽宁'
                    comname1 = monthStandPrem[0].comname
                    comname3 = monthStandPrem[2].comname
                } else if (monthStandPrem[1].comname === '宁波') {
                    comname2 = '浙江'
                    comname1 = monthStandPrem[0].comname
                    comname3 = monthStandPrem[2].comname
                } else if (monthStandPrem[1].comname === '厦门') {
                    comname2 = '福建'
                    comname1 = monthStandPrem[0].comname
                    comname3 = monthStandPrem[2].comname
                }
                if (monthStandPrem[2].comname === '大连') {
                    comname3 = '辽宁'
                    comname1 = monthStandPrem[0].comname
                    comname2 = monthStandPrem[1].comname
                } else if (monthStandPrem[2].comname === '宁波') {
                    comname3 = '浙江'
                    comname1 = monthStandPrem[0].comname
                    comname2 = monthStandPrem[1].comname
                } else if (monthStandPrem[2].comname === '厦门') {
                    comname3 = '福建'
                    comname1 = monthStandPrem[0].comname
                    comname2 = monthStandPrem[1].comname
                } else {
                    comname3 = monthStandPrem[2].comname
                    comname1 = monthStandPrem[0].comname
                    comname2 = monthStandPrem[1].comname
                }
                // 判断大连、宁波、厦门当日标保
                for (let i = 0; i < monthStandPrem.length; i++) {
                    if (monthStandPrem[i].dayamount === '0') {
                        if (monthStandPrem[i].comname === '大连') {
                            this.cityDayD = '0.00'
                        } else if (monthStandPrem[i].comname === '宁波') {
                            this.cityDayN = '0.00'
                        } else if (monthStandPrem[i].comname === '厦门') {
                            this.cityDayX = '0.00'
                        }
                    } else {
                        if (monthStandPrem[i].comname === '大连') {
                            this.cityDayD = (Number(monthStandPrem[i].dayamount) / 10000).toFixed(2)
                        }
                        if (monthStandPrem[i].comname === '宁波') {
                            this.cityDayN = (Number(monthStandPrem[i].dayamount) / 10000).toFixed(2)
                        }
                        if (monthStandPrem[i].comname === '厦门') {
                            this.cityDayX = (Number(monthStandPrem[i].dayamount) / 10000).toFixed(2)
                        }
                    }
                    // map弹框数据匹配
                    if (monthStandPrem[i].comname === '大连') {
                        this.cityAmountD = monthStandPrem[i].amount
                    } else if (monthStandPrem[i].comname === '宁波') {
                        this.cityAmountN = monthStandPrem[i].amount
                    } else if (monthStandPrem[i].comname === '厦门') {
                        this.cityAmountX = monthStandPrem[i].amount
                    } else if (monthStandPrem[i].comname === '辽宁') {
                        this.bbLN = monthStandPrem[i].amount
                    } else if (monthStandPrem[i].comname === '福建') {
                        this.bbFJ = monthStandPrem[i].amount
                    } else if (monthStandPrem[i].comname === '浙江') {
                        this.bbZJ = monthStandPrem[i].amount
                    }
                }
                for (let i = 0; i < monthStandPrem.length; i++) {
                    let name = monthStandPrem[i].comname
                    let value = ''
                    if (monthStandPrem[i].dayamount === '0') {
                        this.aa = '0.00' + '万'
                    } else {
                        this.aa = (monthStandPrem[i].dayamount / 10000).toFixed(2) + '万'
                    }
                    this.bb = monthStandPrem[i].amount
                    if (monthStandPrem[i].comname === '辽宁') {
                        value = '/' + '当日' + this.aa + '/' + '当月' + this.bbLN + '\r\n' + '大连' + '/' + '当日' + this.cityDayD + '万' + '/' + '当月' + this.cityAmountD
                    } else if (monthStandPrem[i].comname === '浙江') {
                        value = '/' + '当日' + this.aa + '/' + '当月' + this.bbZJ + '\r\n' + '宁波' + '/' + '当日' + this.cityDayN + '万' + '/' + '当月' + this.cityAmountN
                    } else if (monthStandPrem[i].comname === '福建') {
                        value = '/' + '当日' + this.aa + '/' + '当月' + this.bbFJ + '\r\n' + '厦门' + '/' + '当日' + this.cityDayX + '万' + '/' + '当月' + this.cityAmountX
                    } else if (monthStandPrem[i].comname === '大连') {
                        value = '/' + '当日' + this.aa + '/' + '当月' + this.bbLN + '\r\n' + '大连' + '/' + '当日' + this.cityDayD + '万' + '/' + '当月' + this.cityAmountD
                    } else if (monthStandPrem[i].comname === '宁波') {
                        value = '/' + '当日' + this.aa + '/' + '当月' + this.bbZJ + '\r\n' + '宁波' + '/' + '当日' + this.cityDayN + '万' + '/' + '当月' + this.cityAmountN
                    } else if (monthStandPrem[i].comname === '厦门') {
                        value = '/' + '当日' + this.aa + '/' + '当月' + this.bbFJ + '\r\n' + '厦门' + '/' + '当日' + this.cityDayX + '万' + '/' + '当月' + this.cityAmountX
                    } else {
                        value = '/' + '当日' + this.aa + '/' + '当月' + this.bb
                    }
                    totalNumber.push(
                        {
                            'name': name,
                            'value': value
                        }
                    )
                }
                // 匹配弹框特殊机构
                for (let i = 0; i < totalNumber.length; i++) {
                    if (totalNumber[i].name === '厦门') {
                        totalNumber[i].name = '福建'
                    }
                    if (totalNumber[i].name === '大连') {
                        totalNumber[i].name = '辽宁'
                    }
                    if (totalNumber[i].name === '宁波') {
                        totalNumber[i].name = '浙江'
                    }
                }
            }
            let k = -1
            const getRandomProvince = () => {
                if (k === totalNumber.length - 1) {
                    k = -1
                }
                k++
                let randomNum = totalNumber[k]
                return randomNum
            }
            this.provinceValue = '0'
            const options = {
                title: {
                    text: '',
                    subtext: '',
                    x: 'center'
                },
                legend: {
                    show: false,
                    orient: 'horizontal', // 图例的排列方向
                    x: 'left', // 图例的位置
                    data: ['']
                },
                geo: [{
                    show: true,
                    map: 'china',
                    top: '76',
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderWidth: 0,
                            shadowColor: '#D79D3D',
                            shadowBlur: 30,
                            shadowOffsetX: -5,
                            shadowOffsetY: 10
                        }
                    }
                }],
                series: [
                    {
                        name: '企业数量',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        zoom: 1,
                        geoIndex: 1,
                        top: '70',
                        itemStyle: {
                            normal: {
                                areaColor: '#1D346F',
                                borderColor: '#D79D3D'
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                name: '', // 中央显示的区域
                                itemStyle: {
                                    color: '#00BFFF',
                                    tooltip: {
                                        show: true
                                    }
                                },
                                label: {
                                    show: true,
                                    formatter: (params) => {
                                        let bb = this.provinceValue.value
                                        let aa = ''
                                        if (params.name === this.provinceValue.name) {
                                            aa = bb
                                        } else {
                                        }
                                        return `${params.name}${aa}`
                                    },
                                    textStyle: {
                                        color: '#fff', // 地图初始化区域字体颜色
                                        fontSize: 18,
                                        padding: 30,
                                        backgroundColor: 'rgba(49,87,179,0.6)'
                                    }
                                }
                            }, {
                                name: comname1, // 中央显示的区域
                                itemStyle: {
                                    color: 'red'
                                }
                            }, {
                                name: comname2, // 中央显示的区域
                                itemStyle: {
                                    color: 'orange'
                                }
                            }, {
                                name: comname3,
                                itemStyle: {
                                    color: 'yellow'
                                }
                            }]
                    }, {
                        name: '企业数量2',
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        zoom: 1,
                        geoIndex: 1,
                        itemStyle: {
                            normal: {
                                areaColor: '#1D346F',
                                borderColor: '#D79D3D'
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        }
                    }
                ]
            }
            window.onresize = this.myChart.resize
            this.myChart.setOption(options)
            setInterval(() => {
                this.count++
                if (this.count === this.Data.length) { this.count = 0 }
                const curProvince = getRandomProvince()
                options.series[0].data[0].name = curProvince.name
                this.provinceValue = curProvince
                this.myChart.setOption(options)
                this.$emit('capital', curProvince.name)
            }, 3000)
            setTimeout(() => {
                const curProvince = getRandomProvince()
                options.series[0].data[0].name = curProvince.name
                this.provinceValue = curProvince
                this.myChart.setOption(options)
                this.$emit('capital', curProvince.name)
                window.onresize = () => {
                    this.myChart.resize()
                }
            }, 50)
            // 取出loginComCode
            this.loginComCode = localStorage.getItem('loginComCode')
            // 账号登录 权限调整
            this.myChart.on('click', (params) => {
                let that = this
                that.name = params.name
                // 本页面请求接口存储省份名字code
                // 换成map
                var flag = false
                var index
                for (let i = 0; i < this.getComcode.length; i++) {
                    if (this.getComcode[i].comname === '大连') {
                        this.dalianComcode = this.getComcode[i].comcode
                        this.dalianName = this.getComcode[i].comname
                    }
                    if (this.getComcode[i].comname === '宁波') {
                        this.ningboComcode = this.getComcode[i].comcode
                        this.ningboName = this.getComcode[i].comname
                    }
                    if (this.getComcode[i].comname === '厦门') {
                        this.xiamenComcode = this.getComcode[i].comcode
                        this.xiamenName = this.getComcode[i].comname
                    }
                }
                for (let i in that.getComcode) {
                    if (that.getComcode[i].comname === that.name) {
                        // 下拉true/false
                        if (params.name === '辽宁') {
                            this.choose = !this.choose
                        } else if (params.name === '浙江') {
                            this.choose = !this.choose
                        } else if (params.name === '福建') {
                            this.choose = !this.choose
                        }
                        if (that.getComcode[i].comname === '辽宁') {
                            this.city[0].Comcode = that.getComcode[i].comcode
                            this.city[0].Name = that.getComcode[i].comname
                            this.city[1].Comcode = this.dalianComcode
                            this.city[1].Name = this.dalianName
                            this.$message({
                                message: '请选择弹框中的机构名称',
                                type: 'success'
                            })
                        } else if (that.getComcode[i].comname === '浙江') {
                            this.city[0].Comcode = that.getComcode[i].comcode
                            this.city[0].Name = that.getComcode[i].comname
                            this.city[1].Comcode = this.ningboComcode
                            this.city[1].Name = this.ningboName
                            this.$message({
                                message: '请选择弹框中的机构名称',
                                type: 'success'
                            })
                        } else if (that.getComcode[i].comname === '福建') {
                            this.city[0].Comcode = that.getComcode[i].comcode
                            this.city[0].Name = that.getComcode[i].comname
                            this.city[1].Comcode = this.xiamenComcode
                            this.city[1].Name = this.xiamenName
                            this.$message({
                                message: '请选择弹框中的机构名称',
                                type: 'success'
                            })
                        }
                        flag = true
                        index = i
                    }
                }
                if (flag) {
                    localStorage.setItem('myComCode', that.name)
                    that.comcode = that.getComcode[index].comcode
                    localStorage.setItem('orgs', that.comcode)
                    if (that.name === '辽宁') {
                    } else if (that.name === '浙江') {
                    } else if (that.name === '福建') {
                    } else {
                        that.$router.push({ path: '/sub' })
                    }
                }
                if (index === undefined) {
                    that.$message({ type: 'warning', message: '该地区暂无机构，请更换地区', duration: 1000 })
                }
            })
        },
        histogram () {
            let histogram = echarts.init(document.getElementById('histogram'))
            let comname1 = this.comname1
            let comname2 = this.comname2
            let comname3 = this.comname3
            let yData = [comname3, comname2, comname1]
            let amount1 = this.amount1
            let amount2 = this.amount2
            let amount3 = this.amount3
            let data = [amount3, amount2, amount1]
            let color = ['yellow', 'orange', 'red']
            let seriesData = []
            data.map((item, index) => {
                seriesData.push({
                    name: '',
                    value: item,
                    itemStyle: {
                        normal: {
                            color: color[index],
                            barBorderRadius: 12
                        }
                    }
                })
            })
            histogram.setOption({
                legend: {
                    show: false
                },
                grid: {
                    left: '0',
                    right: '60%',
                    bottom: '8%',
                    top: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }
                },
                yAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#363e83'
                            }
                        },
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: '#00FFEC',
                                fontWeight: 'normal',
                                fontSize: 16
                            }
                        },
                        data: yData
                    }, {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        data: yData
                    }, {
                        type: 'category',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        data: yData
                    }
                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        stack: '1',
                        yAxisIndex: 0,
                        data: seriesData,
                        color: ['yellow', 'orange', ' red'],
                        barWidth: 16,
                        z: 1
                    },
                    {
                        name: '',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: [7000000, 7000000, 7000000],
                        barWidth: 16,
                        itemStyle: {
                            color: '#446FDA',
                            barBorderRadius: 12
                        },
                        label: {
                            normal: {
                                show: true,
                                color: '#00FFEC',
                                fontSize: 16,
                                padding: [0, 0, 0, 2],
                                position: 'right',
                                formatter: function (params) {
                                    return data[params.dataIndex]
                                }
                            }
                        },
                        z: 0
                    }
                ]
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.box{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

#map2d{
    position: absolute;
    top: 9.5%;
    left: -3.2%;
    width: 90%;
    height: 94%;
}

/* 下拉框样式 */
.dropBox {
    position: absolute;
    bottom: 35%;
    right: 24%;
    width: 8%;
    height: 10%;
    border: 1px solid #446FDA;
    z-index: 200000;
    border-radius: 0.02rem;
}

.dropBox >ul {
    width: 100%;
    height: 100%;
}

.dropBox >ul >li {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 0.12rem;
    background: rgba(68,111,218,0.6);
}

.dropBox >ul >li:hover {
    background: rgba(68,111,218,0.8);
}

#histogram {
    position: absolute;
    bottom: 1%;
    left: 2.5%;
    width: 40%;
    height: 16%;
}
</style>
