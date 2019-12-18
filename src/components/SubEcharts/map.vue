<!--
 * @Author: your name
 * @Date: 2019-10-21 09:51:46
 * @LastEditTime: 2019-12-16 11:40:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /e:\myPro\workPro\work\app3\src\components\subEcharts\subComponents\MidBottom.vue
 -->
<template>
    <div id="box">
        <div id="regionalMap"></div>
    </div>
</template>

<script>
import axios from 'axios'
import base from '../../untils/base.js'
// import echarts from 'echarts'
const echarts = require('echarts')

export default {
    props: ['partInfo'],
    data () {
        return {
            citys: '',
            comcode: '',
            partInfos: [],
            infos: [],
            geoCoordMap: {}
        }
    },
    mounted () {
        this.comcode = localStorage.getItem('orgs')
        axios({
            url: `${base.url}/monthStandPrem?comcode=${this.comcode}`,
            method: 'post'
        }).then(data => {
            this.infos = data.data
            for (let i = 0; i < this.infos.length; i++) {
                let name = this.infos[i].comname
                if (this.infos[i].amount === '0') {
                    this.infos[i].amount = '0.00'
                } else {
                    this.infos[i].amount = (Number(this.infos[i].amount) / 10000).toFixed(2)
                }
                if (this.infos[i].lng_map !== 'null' && this.infos[i].lat_map !== 'null') {
                    let value = [Number(this.infos[i].lng_map), Number(this.infos[i].lat_map), Number(this.infos[i].amount)]
                    this.partInfos.push(
                        {
                            name: this.infos[i].comname,
                            value: value
                        }
                    )
                    this.geoCoordMap[name] = value
                }
            }
            this.RegionalMap()
        })
    },
    methods: {
        RegionalMap () {
            var geoCoordMap = this.geoCoordMap
            var data = this.partInfos // null
            // 后eee台返回数据
            var convertData = function (data) {
                var res = []
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name]
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        })
                    }
                }
                return res
            }
            const citys = this.citys
            const provinces = {
                上海: 'json/shanghai.json',
                河北: 'json/hebei.json',
                山西: 'json/shanxi.json',
                内蒙古: 'json/neimenggu.json',
                辽宁: 'json/liaoning.json',
                吉林: 'json/jilin.json',
                黑龙江: 'json/heilongjiang.json',
                江苏: 'json/jiangsu.json',
                浙江: 'json/zhejiang.json',
                安徽: 'json/anhui.json',
                福建: 'json/fujian.json',
                江西: 'json/jiangxi.json',
                山东: 'json/shandong.json',
                河南: 'json/henan.json',
                湖北: 'json/hubei.json',
                湖南: 'json/hunan.json',
                广东: 'json/guangdong.json',
                广西: 'json/guangxi.json',
                海南: 'json/hainan.json',
                四川: 'json/sichuan.json',
                贵州: 'json/guizhou.json',
                云南: 'json/yunnan.json',
                西藏: 'json/xizang.json',
                陕西: 'json/shanxi1.json',
                甘肃: 'json/gansu.json',
                青海: 'json/qinghai.json',
                宁夏: 'json/ningxia.json',
                新疆: 'json/xinjiang.json',
                北京: 'json/beijing.json',
                天津: 'json/tianjin.json',
                重庆: 'json/chongqing.json',
                香港: 'json/xianggang.json',
                澳门: 'json/aomen.json',
                大连: 'json/dalian2.json',
                宁波: 'json/ningbo.json',
                厦门: 'json/xiamen2.json'
            }
            const data1 = [{
                name: '北京'
            }, {
                name: '天津'
            }, {
                name: '上海'
            }, {
                name: '重庆'
            }, {
                name: '河北'
            }, {
                name: '河南'
            }, {
                name: '云南'
            }, {
                name: '辽宁'
            }, {
                name: '黑龙江'
            }, {
                name: '湖南'
            }, {
                name: '安徽'
            }, {
                name: '山东'
            }, {
                name: '新疆'
            }, {
                name: '江苏'
            }, {
                name: '浙江'
            }, {
                name: '江西'
            }, {
                name: '湖北'
            }, {
                name: '广西'
            }, {
                name: '甘肃'
            }, {
                name: '山西'
            }, {
                name: '内蒙古'
            }, {
                name: '陕西'
            }, {
                name: '吉林'
            }, {
                name: '福建'
            }, {
                name: '贵州'
            }, {
                name: '广东'
            }, {
                name: '青海'
            }, {
                name: '西藏'
            }, {
                name: '四川'
            }, {
                name: '宁夏'
            }, {
                name: '海南'
            }, {
                name: '台湾'
            }, {
                name: '香港'
            }, {
                name: '澳门'
            }, {
                name: '大连'
            }, {
                name: '宁波'
            }, {
                name: '厦门'
            }]
            for (let i = 0; i < data1.length; i++) {
                data1[i].value = Math.round(Math.random() * 10000)
            }
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + ' : ' + params.value[2]
                    }
                },
                geo: {
                    map: citys,
                    roam: false,
                    // roam: 'scale',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: 'rgb(255, 215, 0)',
                            borderColor: 'rgb(9, 54, 95)'
                        },
                        emphasis: {
                            areaColor: 'rgb(255, 165, 0)'
                        }
                    }
                },
                series: [{
                    name: '选择器',
                    type: 'map',
                    mapType: 'china',
                    left: 'left',
                    top: '0',
                    width: '-10%',
                    height: '-10%',
                    roam: false,
                    selectedMode: 'single',
                    showLegendSymbol: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: data1
                }, {
                    name: '散点',
                    type: 'scatter',
                    left: '10%',
                    top: '100',
                    // width: '65%',
                    // height: '65%',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: 8,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    }
                }],
                animation: false
            }
            const myChart = echarts.init(document.getElementById('regionalMap'))
            myChart.setOption(option, true)
            function showCity (area) {
                const selectedProvince = area
                if (!provinces[selectedProvince]) {
                    option.series.splice(1)
                    option.legend = null
                    option.visualMap = null
                    myChart.setOption(option, true)
                    return
                }
                axios.get(provinces[selectedProvince])
                    .then((response) => {
                        echarts.registerMap(selectedProvince, response.data)
                        option.legend = {
                            left: 'right',
                            data: ['随机数据']
                        }
                        option.visualMap = {
                            seriesIndex: 1,
                            orient: 'horizontal',
                            left: 'left',
                            show: false,
                            min: 0,
                            max: 0,
                            color: ['orange', 'red'],
                            splitNumber: 0
                        }
                        myChart.setOption(option, true)
                    })
            }
            showCity(this.citys)
        }
    },

    created () {
        let data = localStorage.getItem('myComCode')
        this.citys = data
    }
}
</script>

<style scoped lang='scss'>
#box {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1000
}

#regionalMap {
    position:absolute;
    left: 1%;
    top: 20%;
    width: 80%;
    height: 75%;
}
</style>
