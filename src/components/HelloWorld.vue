<template>
  <div class="hello">
    <!-- 通过点击两个不同的按钮切换不同的路由 -->
    <router-link to="/">
      <el-button>按钮</el-button>
    </router-link>
    <router-link to="/user">
       <el-button type="primary">主要按钮</el-button>
    </router-link>
  
  
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
