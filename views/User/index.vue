<template>
<div class="manage">
     <!-- 点击新增会有dialog的弹窗  -->
     <!-- :title="operateType === 'add' ? '新增用户' : '更新用户' "判断属性在进行什么操作 -->
    <el-dialog 
        :title="operateType === 'add' ? '新增用户' : '更新用户' "
        :visible.sync ="isShow"       
        
    >
        <common-form
            :formLabel = "operateFormLabel"
            :form = "operateForm"
            :inline = "true"
            ref="form" 
           
        ></common-form>
        <!-- 给弹窗加一个底部 -->
        <div slot="footer" class="dialog-footer" >
            <el-button @click="isShow = false">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
        </div>
    </el-dialog>
    <div class="manage-header">
        <el-button type="primary" @click="addUser">+ 新增</el-button>
        <common-form
            :formLabel = "formLabel"
            :form = "searchForm"
            :inline = "true"
            ref="form"
        >
            <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
        </common-form>
    </div>
    <!-- :tableLabel是表格中列的配置数据 -->
    <common-table
        :tableData = "tableData"
        :tableLabel = "tableLabel"
        :config = "config"
        @changePage = "getList()"
        @edit = "editUser"
        @del = "delUser"
    ></common-table>
</div>
</template>
<script>
import CommonForm from "../../src/components/CommonForm.vue"
import CommonTable from "../../src/components/CommonTable.vue"
import { getUser } from '../../api/data'
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'User',
    // 引入组件
    components:{
        CommonForm,
        CommonTable,
       
    },
    data(){
        return {
            operateType:'add',
            isShow:false,
            operateFormLabel:[
                {
                    model:'name',
                    label:'姓名',
                    type:'input',
                },
                {
                    model:'age',
                    label:'年龄',
                    type:'input',
                },
                {
                    model:'sex',
                    label:'性别',
                    type:'select',
                    opts:[
                        {
                            label:'男',
                            value:1
                        },
                        {
                            label:'女',
                            value:0
                        },
                    ]
                },
                {
                    model:'birth',
                    label:'出生日期',
                    type:'date'
                },
                {
                    model:'addr',
                    label:'地址',
                    type:'input'
                }
            ],
            operateForm:{
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: '',
            },
            formLabel:[
                {
                    model:"keyword",
                    label:'',
                    type:'input'
                }
            ],
            searchForm:{
                keyword:' ',
            },
            tableData:[],
            tableLabel:[
                {
                    prop:"name",
                    label:"姓名",
                },
                {
                    prop:"age",
                    label:"年龄",
                },
                {
                    prop:"sexLabel",
                    label:"性别",
                },
                {
                    prop:"birth",
                    label:"出生日期",
                    width:200
                },
                {
                    prop:"addr",
                    label:"地址",
                    width:320
                },
            ],
            config:{
                page:1,
                total:30,
            }
        }
    },
    methods:{
        confirm(){
            if(this.operateType === 'edit'){
                this.$http.post('/user/edit',this.operateForm).then(res => {
                    console.log(res)
                    this.isShow = false
                    this.getList()
                })
            }else{
                this.$http.post('/user/add',this.operateForm).then(res => {
                     console.log(res)
                    this.isShow = false
                    this.getList()
                })
            }
        },
        addUser(){
            this.isShow = true,
            this.operateType = 'add',
            this.operateForm = {
                name:'',
                age:'',
                sex:'',
                birth:'',
                addr:''
            }
        },
        getList(name = ''){
            this.config.loading = true
            name ? (this.config.page = 1) : ''
            getUser({
                page:this.config.page,
                name
            }).then(({data: res }) =>{
                
                this.tableData = res.list.map(item => {
                    item.sexLabel = (item.sex === 0) ? "女" : "男"
                    return item
                })
                this.config.total = res.count
                this.config.loading = false
            })
            console.log(name)
            
        },
        editUser(row){
            this.operateType = 'edit'
            this.isShow = true
            this.operateForm = row
        },
        delUser(row){
            this.$confirm("此操作将永久删除该文件，是否继续","提示",{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                type:"warning"
            }).then(()=> {
                const id = row.id
                this.$http.post("/user/del",{
                    params:{ id },
                }).then(() =>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.getList()
                })
            })
        },
    },
   //页面加载的时候就要被调用，所以要在声明周期中调用
   created(){
       this.getList()
   },

}
</script>

<style  lang="less" scoped>
.manage-header{
    display:flex;
    justify-content: space-between;
    align-items: center;
}
</style>