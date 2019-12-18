<!--
 * @Author: your name
 * @Date: 2019-10-28 15:30:22
 * @LastEditTime: 2019-11-12 16:15:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \five\work_today\demo\src\views\Sub.vue
 -->
<template>
    <div class="RightBox">
        <div class="box1">
            <LeftTopFirst/>
        </div>
        <div class="box2">
            <RightBase/>
        </div>
    </div>
</template>
<script>
import LeftTopFirst from './LeftTopFirst.vue'
import RightBase from './RightBase.vue'

export default {
    components: {
        LeftTopFirst,
        RightBase
    }
}
</script>
<style scoped lang="scss">
.RightBox{
    width: 100%;
    height: 90vh;
    padding-left: 0.3rem;
    box-sizing: border-box;
}
.box1{
    width: 100%;
    height: 66%;
}
.box2{
    width: 100%;
    height: 34%;
}
</style>
