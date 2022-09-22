
// 全部引入
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from '../router';
import './assets/less/index.less';
import store from '../store';
import http from 'axios';
import '../api/mock.js'
Vue.use(ElementUI);
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$message = ElementUI.Message


// 导航守卫的逻辑
router.beforeEach((to,from,next) =>{
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({ name:'login' })
  }else if(token && to.name === 'login'){
    next( { name:'home'})
  }
  else{
    next()
  }
})
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App),
  created(){
    store.commit('addMenu',this.router)
  }
}).$mount("#app");
