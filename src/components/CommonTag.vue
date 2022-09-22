<template>
    <div class="tabs">
        <el-tag 
            v-for="(tag,index) in tags" 
            :key="tag.name" 
            :closable = "tag.name !== 'home'" 
            :effect="$route.name === tag.name ? 'dark' :'plain'" 
            @click="changeMenu(tag)"
            @close="handleClose(tag,index)"
            size="small"
        >
            {{ tag.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapState,mapMutations} from 'vuex'
export default {
    name:'CommonTag',
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    },
    methods:{
        ...mapMutations({
            close:'closeTag'
        }),
        // 点击事件
        changeMenu(item){
            this.$router.push({ name:item.name})
        },
        // 删除事件
        handleClose(tag,index){
            this.close(tag)
            const length = this.tags.length - 1
           
            if( tag.name !== this.$router.name){
                return;
            }
            if(index == length){
                this.$router.push({
                    name:this.tags[index - 1].name//向左跳转   这里有问题，高亮不能实现向左移动
                })
            }
            else{
                this.$router.push({
                    name:this.tags[index -1].name
                })
            }
           
        },
       
    }
}
</script>
<style lang="less" scoped>
.tabs{
    padding:20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
    
}
</style>
