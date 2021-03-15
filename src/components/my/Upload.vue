<template>
    <div>
        <el-upload
                ref="upload"
                class="avatar-uploader"
                :multiple="!!setting.multiple"
                :accept="accept"
                :action="qiniuUrl"
                :data="uploadData"
                :file-list="fileList"
                :list-type="setting.listType ? setting.listType : 'text'"
                :before-upload="handleBeforeUpload"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :limit="1"
                :on-error="handleError"
                :on-success="handleSuccess">

            <template v-if="imgUrl">
                <img class="avatar img" v-if="scType==1" :src="imgUrl">
                <video class="video" v-else-if="scType==2"  :src="imgUrl" :autoplay="false" controls></video>
            </template>
            <template v-else>
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </template>

            <!--<img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        </el-upload>
    </div>
</template>
<script>
    import Md5 from "js-md5";

    export default {
        name: 'my-upload',
        props : ['setting','sourceType', 'url'],
        data() {
            return {
                qiniuUrl : this.$qiniuUrl,
                imgUrl: this.url,
                scType: this.sourceType, // 1图片/2视频/3其他
                allowExt: this.setting.allowExt ? this.setting.allowExt : [],
                fileSize: this.setting.fileSize ? this.setting.fileSize : 5,  //默认5M
                accept : '',
                fileList:[],
                uploadData:{},
            }
        },
        created(){
            if(this.imgUrl)
            {
                this.fileList.push({name:"文件", url: this.imgUrl})
            }

            this.accept = this.getAccept();
            this.setQiniuToken();
        },
        methods: {
            // 支持的上传类型
            getAccept(){
                if(this.setting.accept) {
                    return this.setting.accept;
                }
                let acceptObj = {
                    "1" : "image/jpeg,image/jpg,image/webp,image/png,image/bmp",
                    "2" : "video/mp4",
                    "3" : ""
                };
                return acceptObj[this.scType] ? acceptObj[this.scType] : "";
            },

            // 设置qiniutoken
            setQiniuToken(){
                // 获取七牛token
                let token      = this.$token;
                this.$http.post('qiniu_token', {token}).then(res => {
                    if (res.data.code == 200) {
                        this.uploadData.token =  res.data.data.qiniu_token;
                    } else {
                        this.$emit('error', res.data.msg);
                    }
                });
            },
            /**
             * 文件上传
             * @param file
             * @returns {boolean}
             */
            handleBeforeUpload (file) {
                let name     = file.name.lastIndexOf('.');
                let ext      = file.name.slice(name+1);
                let fileSize = file.size;
                let msg      = null;

                if(! this.checkExt(ext))
                {
                    msg = `扩展名仅支持 ${this.allowExt} 这几种`;
                }

                if(this.gtSize(fileSize))
                {
                    msg = `文件大小不得超过 ${this.fileSize} M`;
                }

                if(msg)
                {
                    this.$refs.upload.abort(file);
                    this.$emit('error', msg);
                    return false;
                }

                // 构造文件名
                this.uploadData.key = 'common/'+ext+'/'+Md5(file.size+file.name+file.lastModified) + '.' + ext;
                return true;
            },
            /**
             * 检测扩展名
             * @param ext
             * @returns {boolean}
             */
            checkExt (ext) {
                 return this.allowExt.length ? this.allowExt.includes(ext) : true;
            },
            /**
             * 检测文件大小
             * @param size
             * @returns {boolean}
             */
            gtSize(size) {
                 return (size / 1024 / 1024) > this.fileSize;
            },
            /**
             * 错误处理
             * @param err
             */
            handleError (err) {
                this.$emit('error', err);
            },
            /**
             * 删除文件列表
             * @param file
             * @param fileList
             */
            handleRemove (file, fileList) {
                this.imgUrl   = '';
                this.fileList = [];
            },
            /**
             * 文件数量超出限制
             * @param files
             * @param fileList
             */
            handleExceed (files, fileList) {
                let msg = `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`;
                this.$emit('error', msg);
            },
            /**
             * 上传成功
             * @param res
             * @param file
             */
            handleSuccess(res, file) {
                this.imgUrl = URL.createObjectURL(file.raw);
                let url     = this.$cdnDomain + "/" + file.response.key.replace();
                this.$emit('success', url);
            }
        },
    }

</script>
<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }

    .img {
        width: 80px;
        height: 80px;
        line-height: 80px;
    }

    .video {
        width: 200px;
        height: 120px;
    }

    /deep/.el-upload{
        width: auto;
        height: auto;
    }
</style>
