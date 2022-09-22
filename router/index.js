// 关于路由的配置在此文件
import Vue from "vue";
import VueRouter from "vue-router";
// import { component } from "vue/types/umd";
// import Home from '../views/Home.vue' ;

Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        name:'Main',
        component:() => import('../views/Main.vue'),
      
        children:[
        //     {
        //         path:'/home',
        //         name:'home',
        //         component:() => import('../views/home')
        //     },
        //     {
        //         path:'/user',//路径
        //         name:'user',//该路由对应的名字
        //         component:() => import('../views/User')//该路由对应的页面
        //     },
        //     {
        //         path:'/mall',
        //         name:'mall',
        //         component:() => import('../views/mall')
        //     },
        //     {
        //         path:'/pageOne',
        //         name:'page1',
        //         component:() => import('../views/other/pageOne')
        //     },
        //     {
        //         path:'/pageTwo',
        //         name:'page2',
        //         component:() => import('../views/other/pageTwo')//按需引入的方式
        //     },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:() => import('../views/Login/login.vue')
    }

]

const router = new VueRouter({
    mode:'hash',
    routes
})
export default router