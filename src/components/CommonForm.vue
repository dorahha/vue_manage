<template>
<!-- form组件的编写 -->
    <el-form ref="form" label-width="100px" :model="form" :inline="inline">
        <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
            <el-input
                v-if="item.type === 'input'"
                :placeholder="'请输入'+ item.label"              
                v-model="localForm[item.model]"
                
            ></el-input>
            <el-switch v-if="item.type === 'switch'"  v-model="localForm[item.model]"></el-switch>
            <el-date-picker
                v-if="item.type === 'date'"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="localForm[item.model]"
            ></el-date-picker>
             <!-- 是对事件的绑定 :v-model="form[item.model]" -->
            <el-select
                v-if="item.type === 'select'"
                placeholder="请选择"              
               v-model="localForm[item.model]"
            >
                <el-option 
                    v-for="item in item.opts" 
                    :key="item.value" 
                    :label="item.label" 
                    :value="item.value"
                   
                > 
                </el-option>
            </el-select>
        </el-form-item>
        <!-- 组件的扩展 -->
        <el-form-item><slot></slot></el-form-item>
    </el-form>
</template>
<script>
export default{
    name:'CommonForm',
    props:{
        //接收相关配置
        formLabel:Array,
        // 接收form的数据
        form:Object,
        // 表单的布局
        inline:Boolean
    },
    data(){
        return {
            localForm:this.form,
           
        }
    },
    methods:{
        
    }
   
}
</script>

