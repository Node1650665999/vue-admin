<template>
    <!--注意：单文件组件中的 <template> 下面只能有一个根元素-->
    <div>
        <div v-for="item in items" :key="item.index">
        <!--有子级菜单,则递归渲染-->
            <el-submenu v-if="item.subs" :index="item.index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <menu-tree :items="item.subs"></menu-tree>
            </el-submenu>
        <!--如果没有则渲染当前菜单-->
            <el-menu-item v-else :index="item.index" :key="item.index">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'sidebar-tree',
        data() {
            return {};
        },
        props: ['items']
    };
</script>
