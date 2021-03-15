<template>
    <div class="box">
        <select-tree ref="child" :parent-id.sync="parentId"></select-tree>
        <el-button @click="setParentId(4)">设置</el-button>
        <el-button @click="getParentId">获取</el-button>
    </div>
</template>

<script>
    import SelectTree from "@/components/my/SelectTree";
    export default {
        data() {
            return {
                parentId : 0
            }
        },
        methods : {
            setParentId (id){
                this.parentId          = id;
                this.$refs.child.value = id;
            },
            getParentId (){
                console.log(this.parentId)
            }
        },
        components : {
            SelectTree
        }
    };
</script>
<style  scoped>

</style>