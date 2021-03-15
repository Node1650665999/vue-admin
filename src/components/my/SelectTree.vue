<template>
    <el-select v-model="value" @change="selectChange" placeholder="请选择">
        <el-option
                v-for="item in optionList"
                :key="item.id"
                :label="'\u3000'.repeat(item.depth) + item.name"
                :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        props : ['parentId'],
        data() {
            return {
                optionList : [],
                value : this.parentId
            };
        },
        methods : {
            selectChange(val) {
                this.$emit('select-change', val)
            }
        },
        created() {
            let firstElm = {
                id : 0,
                depth : 0,
                name : '顶级菜单',
                type : 1,
                parent_id : 0,
                route : '',
                permission : ''
            };
            this.optionList =  this.$common.permissionList();
            this.optionList.unshift(firstElm);
        }
    };
</script>
<style  scoped>

</style>