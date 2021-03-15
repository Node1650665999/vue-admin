<template>
    <div class="box">
        <hzg-upload :url="url" :source-type="1" :setting="{}" @success="handleSuccess" @error="handleError"></hzg-upload>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                url: '',
            }
        },
        methods : {
            handleSuccess (url) {
                console.log(url)
            },
            handleError (msg) {
                this.$message.error(msg);
            }
        },
    }
</script>
<style  scoped>

</style>