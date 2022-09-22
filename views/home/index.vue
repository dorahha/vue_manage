<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div><hr>
                </div>
                <div class="login-info">
                    <span>2022-5-21</span><p>上次登录的时间:</p>
                    <span>湖南永州</span><p>上次登录的地点:</p>
                </div>
            </el-card>
            <el-card style="margin-top:20px;height:460px">
                <el-table :data="tableData">
                    <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col style="margin-top:20px" :span="16">
            <div class="num" >
                <el-card v-for="item in countData" :key="item.name" :body-style="{ display:'flex',padding:0 ,height:'50px'}">
                    <i class="icon" :class="'el-icon-'+ item.icon" :style="{background:item.color}" style="font-size:50px"></i>
                    <div class="detail">
                        <p class="price">￥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height:280px ">
                <div style="height:280px" ref="echarts">

                </div>
            </el-card>
            <div class="graph">
                <el-card style="height:260px">
                    <div style="height:240px" ref="userEcharts"></div>
                </el-card>
                <el-card style="height:260px">
                    <div style="height:240px" ref="videoEcharts"></div>
                </el-card>
            </div>
        </el-col>
       
       
    </el-row>
</template>
<script>
import {getData} from '../../api/data.js'
import * as echarts from 'echarts'
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'User',
    data(){
        return {
            userImg:require("../../src/assets/img/user.jpg"),
            // 定义一个tableData的数组用来存放数据
            tableData:[
                {
                    name:'vivo',
                    todayBuy:100,
                    monthBuy:300,
                    totalBuy:800,
                },
                {
                    name:'苹果',
                    todayBuy:100,
                    monthBuy:300,
                    totalBuy:800,
                },
                {
                    name:'小米',
                    todayBuy:100,
                    monthBuy:300,
                    totalBuy:800,
                },
                {
                    name:'三星',
                    todayBuy:100,
                    monthBuy:300,
                    totalBuy:800,
                },
                {
                    name:'OPPO',
                    todayBuy:100,
                    monthBuy:300,
                    totalBuy:800,
                },
            ],
            tableLabel:{
                name:'机型',
                todayBuy:'今日购买',
                monthBuy:'本月购买',
                totalBuy:'总购买',
            },
            countData:[
                {
                    name:'今日订单',
                    value:1234,
                    icon:'success',
                    color:'#2ec7c9',
                },
                {
                    name:'今日收藏订单',
                    value:210,
                    icon:'star-on',
                    color:'#ffb980',
                },
                {
                    name:'今日未支付订单',
                    value:1234,
                    icon:'s-goods',
                    color:'#5ab1ef',
                },
                {
                    name:'今日订单',
                    value:1234,
                    icon:'success',
                    color:'#2ec7c9',
                },
                {
                    name:'今日收藏订单',
                    value:210,
                    icon:'star-on',
                    color:'#ffb980',
                },
                {
                    name:'今日未支付订单',
                    value:1234,
                    icon:'s-goods',
                    color:'#5ab1ef',
                    
                },
               
            ]
        }
    },
    mounted(){
        getData().then(res =>{
            const{code , data} = res.data
            if(code === 20000){
                this.tableData = data.tableData
                const order = data.orderData
                const xData = order.date
                const keyArray = Object.keys(order.data[0])
                const series = []
                keyArray.forEach(key =>{
                    series.push({
                        name:key,
                        data:order.data.map(item =>item[key]),
                        type:'line'
                    })
                })
                const option = {
                    xAxis:{
                        data:xData
                    },
                    yAxis:{},
                    legend:{
                        data:keyArray
                    },
                    series
                }
                // 初始化图表
               const E = echarts.init(this.$refs.echarts)
               E.setOption(option)
               //用户图
               const userOption ={
                   legend:{
                       textStyle:{
                           color:"#333",
                       },
                   },
                   grid:{
                       left:"20%",
                   },
                    //提示框
                    tooltip:{
                        trigger:"axis",
                    },
                    xAxis:{
                        type:"category",
                        data:data.userData.map(item => item.data),
                        axisLine:{
                            lineStyle:{
                                color:"#17b3a3",
                            },
                        },
                        axisLabel:{
                            interval:0,
                            color:"#333",
                        },
                    },
                    yAxis:[
                         {
                            type:"value",
                            axisLine:{
                                lineStyle:{
                                    color:"#17b3a3",
                                },
                            },
                        },
                    ],
                    color:["#2ec7c9","#b6a2de"],
                    series:[
                        {
                            name:'新增用户',
                            data:data.userData.map(item => item.new),
                            type:'bar'//柱状图
                        },
                        {
                            name:'活跃用户',
                            data:data.userData.map(item => item.active),
                            type:'bar'//柱状图
                        },
                    ],
               }
               const U = echarts.init(this.$refs.userEcharts)
               U.setOption(userOption)
            //    饼状图
            const videoOption ={
                tooltip:{
                    trigger:"item",
                },
                color:[
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series:[
                    {
                        data:data.videData,
                        type:'pie'
                    }
                ],
            }
            const V = echarts.init(this.$refs.videoEcharts)
            V.setOption(videoOption)
           
            }
            console.log(res)
        })
    }

}
</script>
<style lang="less" scoped>
.user>img{
    width: 150px;
    height: 150px;
    position: relative;
    border-radius: 50%;
}
.userinfo>.name{
    position: absolute;
    left: 200px;
    top: 80px;
    font-size: 20px;
    
}
.userinfo>.access{
    position: absolute;
    left: 200px;
    top: 110px;
    color: #b9b4b4;
}
.login-info{
   
    width: 300px;
    height: 100px;
    // background-color: aqua;
}
.login-info>p{
    float: left;
    display: block;
    height: 20px;
    margin-right: 20px;
    margin-left: 30px;
    margin-top: 20px;
    line-height: 20px;
    color: #888585;
   
}
.login-info>span{
    float: right;
    // font-size: 18px;
    display: block;
    height: 35px;
    margin-right: 20px; 
    margin-top: 20px;
    text-align: left;
    line-height: 20px;
    color: #888585;
    
}
.num {
    // width: 800px;
  display: flex; /*对于一行会自动弹性布局*/
  flex-wrap: wrap; /*对于6个模块需要换行*/
  justify-content: space-between; /*表示水平两端对齐，justify-content：水平对齐的方式*/
}
.detail{
    position: relative;
    width: 206px;
    height: 50px;
}
.detail>.price{
    position: absolute;
    margin-top: 0;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 25px;
    color: black;
    font-size: 18px;
}
.detail>.txt{
    position: absolute;
    margin-top: 0;
    top: 25px;
    left: 0;
    display: block;
    width: 100%;
    height: 25px;
    color: black;
    font-size: 14px;
}

.num .el-card {
  width: 32%;
  margin-bottom: 20px; /*模块之前有间隔*/
}
.graph {
  display: flex; /*对于一行会自动弹性布局*/
  justify-content: space-between; /*表示水平两端对齐，justify-content：水平对齐的方式*/
}
 .graph .el-card {
  width: 49%;
  margin-top: 20px; /*模块之前有间隔*/
}

</style>