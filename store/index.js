import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab';
import user from './user'
// 将vuex进行全局的注入
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        user
    }
})