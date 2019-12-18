/*
 * @Author: your name
 * @Date: 2019-11-12 09:59:44
 * @LastEditTime: 2019-12-17 15:41:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cockpits\src\untils\base.js
 */
// 对请求的接口域名进行统一管理
let Url = ''
if (process.env.VUE_APP_ENV === 'production') {
    // 生产环境
    Url = 'http://10.0.11.213:34612/api/v1'
} else if (process.env.NODE_ENV === 'alpha') {
    // 测试环境
    Url = 'http://10.0.11.213:34612/api/v1'
} else {
    // 开发环境
    Url = 'http://10.0.11.213:34612/api/v1'
}
const base = {
    url: Url
}
export default base
