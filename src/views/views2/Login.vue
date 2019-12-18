<!--
 * @Author: your name
 * @Date: 2019-10-31 21:25:58
 * @LastEditTime: 2019-11-25 14:55:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \five\work_today\pros_new\src\views\Login.vue
 -->
 <template>
    <div class='login'>
        <div id='login'>
            <div id='login-group'>
                <div class='login-title'>用户登录</div>
                <div class='input-group'>
                    <!-- <div>用户名</div> -->
                    <el-input size="large" placeholder="请输入账号" type='text' v-model='gonghao'>
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                </div>
                <div class='input-group'>
                    <!-- <div>密&nbsp;&nbsp;&nbsp;码</div>@change='clickLogin' -->
                    <el-input size="large" placeholder="请输入密码" type='password' v-model='password'>
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </div>
                <el-button size="medium" type='primary' @click='clickLogin' class='login-btn'>登录</el-button>
            </div>
            <div id='bg-group'>
                <div class='bg-title'>XXXX平台</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import base from '../../untils/base.js'
import { Input, Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
    name: 'login',
    data () {
        return {
            comCode: '',
            msg: 'test',
            checked: false,
            gonghao: '',
            password: '',
            page: {
                currentPage: 1,
                perPage: 10,
                totalPage: 0,
                totalSize: 0
            },
            value: ''
        }
    },
    components: {
        'el-button': Button,
        'el-input': Input
    },
    mounted () {
        localStorage.clear()
    },
    methods: {
        clickLogin () {
            // 测试
            if (this.gonghao === '' || this.password === '') {
                this.$message({
                    type: 'warning',
                    message: '请输入账号密码',
                    duration: 1000
                })
            } else {
                axios({
                    url: `${base.url}/login`,
                    method: 'post',
                    data: { gonghao: this.gonghao, password: this.password }
                }).then(data => {
                    if (Number(data.data.msg) === 200) {
                        this.loginComCode = data.data.org
                        localStorage.setItem('loginComCode', this.loginComCode)
                        this.$router.push({
                            path: '/Emain'
                        })
                    } else {
                        this.$message({ type: 'warning', message: '账号和密码输入错误', duration: 1000 })
                    }
                })
            }
        },
        getToken () {
            if (!localStorage.getItem('token')) {
                return localStorage.getItem('token')
            }
            return null // 如果获取不到token就发送null给服务器端
        },
        handleTokenFailed (code) {
            if (code === 401) {
                localStorage.clear()
                this.$message({ type: 'warning', message: '登录已失效，请重新登录！', duration: 1000 })
                setTimeout(() => {
                    this.$router.push({ path: '/login' })
                }, 1000)
            }
        }
    }
}
</script>
<style lang="css">
.el-select{
  width:100%;
}
#select11{
  color: #000!important;
  background: #ffffff;
}
.el-scrollbar__wrap {
    overflow: scroll;
    height: 100%;
    background: #fff;
}
</style>
<style lang='scss' scoped>
    #login {
        position: relative;
        height: 100vh;
        background-image: url('../../assets/image/login2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
    }

    #login-group {
        position: absolute;
        top: 50%;
        left: 80%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        -o-transform: translate(-50%,-50%);
        box-shadow: 0 0.02rem 0.04rem rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        padding: 25px;
        border-radius: 5px;
        position: absolute;
        z-index: 2;
        background: #fff;
        width: 250px;
    }

    #login-group .login-title {
        text-align: center;
        color: #344ebc;
        font-size: 24px;
        height:50px;
    }

    .input-group {
        font-size: 16px;
        height: 60px;
        line-height: 60px;
        margin-bottom: 10px;
        /* color: #000; */
    }
    .el-input__icon{
        font-size: 18px;
    }
    .rememberpassword {
        margin-top: -30px;
    }

    .login-btn {
        width: 100%;
        position: relative;
        top: -20px;
        background-color: rgba(52, 127, 189);
    }

    #bg-group {
        width: 100%;
        height: 300px;
        background: rgba(52, 127, 189, 0.6);
        position: absolute;
        left: 0;
        top: 0px;
        right: 0px;
        bottom: 0px;
        z-index: 1;
        margin: auto;
        line-height: 300px;
        color: #fff;
    }

    #bg-group .bg-title {
        font-size: 80px;
        width: 800px;
        text-align: center;
        margin-left: 0.5rem;
        letter-spacing: 0.2rem;
    }

    #bg-group .bg-remark {
        font-size: 20px;
        width: 260px;
        margin-top: 10px;
        text-align: center;
    }
    .el-input__inner{
        height: 40px;
        line-height: 40px;
    }
</style>
