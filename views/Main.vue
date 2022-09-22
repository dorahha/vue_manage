<template>
    <el-container style="height:100%">
      <el-aside width="auto">
          <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
            <!-- 这个相当于使用组件 -->
            <common-header></common-header>
        </el-header>
        <common-tag/>
        <el-main>
            
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
import CommonAside from '../src/components/CommonAside.vue';//相当于引用组件
import CommonHeader from'../src/components/CommonHeader.vue';
import CommonTag from '../src/components/CommonTag.vue';
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Home',
    components:{
        CommonAside,//这个就相当于注册组件
        CommonHeader,
        CommonTag
    },
    data(){
        return {}
    }

}
</script>
<style lang="less" scoped>
.el-header{
    background-color: #333;

}
.el-main{
    padding-top: 0;
}
</style>