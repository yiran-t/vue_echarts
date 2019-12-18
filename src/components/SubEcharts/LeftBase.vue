<!--
 * @Author: your nam；
 * @Date: 2019-10-28 15:30:22
 * @LastEditTime: 2019-11-21 21:24:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \five\work_today\dremo\src\views\Sub.vue
 -->
 <template>
    <el-row id="leftBaseBox">
      <!-- 标题 -->
        <div class="title">
            <img src="../../assets/image/little01.png" alt="大单排名标题">
            <p>客户数 <i style="font-size: 0.12rem">(单位: 人)</i></p>
        </div>
      <!-- content -->
      <div class="pic">
        <ul>
            <li :class="{'active':isActive1,'clearfix': true}">
                <div class="sub_title">投保人客户</div>
                <div class="sub_data">{{ appntno }}</div>
            </li>
            <li :class="{'active':!isActive1,'clearfix': true}">
                <div class="sub_title">被保人客户</div>
                <div class="sub_data">{{ insuredno }}</div>
            </li>
        </ul>
      </div>
    </el-row>
</template>
<script>
import axios from 'axios'
import base from '../../untils/base.js'
import { Row } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
    data () {
        return {
            isActive1: 1,
            appntno: '',
            insuredno: '',
            comcode: '',
            flag: false
        }
    },
    components: {
        'el-row': Row
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

    // 清除定时器
    watch: {
        flag: {
            handler (newVal, oldVal) {
                this.flag = newVal
                if (this.flag) {
                    axios({
                        url: `${base.url}/customerNum?comcode=${this.comcode}`,
                        method: 'post'
                    }).then(data => {
                        this.appntno = data.data.totalappnt
                        this.insuredno = data.data.totalinsured
                        this.flag = false
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

        // 客户数
        this.comcode = localStorage.getItem('orgs')
        axios({
            url: `${base.url}/customerNum?comcode=${_this.comcode}`,
            method: 'post'
        }).then(data => {
            this.appntno = data.data.totalappnt
            this.insuredno = data.data.totalinsured
        })
    }
}
</script>
<style scoped lang="scss">
#leftBaseBox{
    width: 100%;
    height: 100%;
    padding-left: -0.2rem;
}
/* 标题 */
.title{
    position: relative;
    width: 100%;
    height: 0.4rem;
}

.title>img{
    position: absolute;
    width: 75%;
    height: 0.4rem;
}

.title>p{
    position: absolute;
    top: 0.04rem;
    color: #fff;
    font-size: 0.2rem;
    letter-spacing: 0.03rem;
}

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
    padding-left: 1%;
    box-sizing: border-box;
}

.sub_data {
    width: 20%;
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
