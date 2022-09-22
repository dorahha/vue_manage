<template>
  <header>
    <div class="l-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/" >
        <el-breadcrumb-item class="myColor"  v-for="item in tags" :key="item.path" :to="{path: item.path}" > {{ item.label}}</el-breadcrumb-item>
        
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native = "logOut">退出</el-dropdown-item>
         
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/img/user.jpg"),
    };
  },
  methods:{
      handleMenu(){
          this.$store.commit('collapseMenu')
      },
      logOut(){
        this.$store.commit('clearToken')
        this.$store.commit('clearMenu')
        this.$router.push("/login")
      }
  },
  computed:{
    ...mapState({
      tags:state => state.tab.tabsList
    })
  }
};
</script>
<style lang="less" scoped>

h3{
    font-size: 14px;
    font-weight: normal;
}
header{
    display: flex;//固定
    height: 100%;
    justify-content: space-between;//左右居中
    align-items:center;//上下居中
}
.l-content{
    display: flex;
    align-items: center;
    
    .el-button{
        margin-right: 20px;//按钮右侧设置宽度

    }
    
    .myColor /deep/ .el-breadcrumb__inner {
      color: rgb(216, 214, 214) ;
      font-weight: normal;
    }
    // .myColor  .el-breadcrumb:last-child{
      
    //   color: white;
    //   font-weight: bold;
    // }

  
}
 
 
.r-content{
   
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
  
   

}
</style>
