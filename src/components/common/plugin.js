import http   from "@/api/http";
import common from "@/components/common/common";
import upload from "@/components/my/Upload";

//api 域名
let apiDomain = '';
if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_FLAG === 'pro') {
    apiDomain = 'http://pro.xxx.cn';
} else {
    apiDomain = 'http://test.xxx.cn';
}

export default {
    install(Vue,options) {
        Vue.prototype.$http      = http;
        Vue.prototype.$common    = common;
        Vue.prototype.$qiniuUrl  = 'http://up-z2.qiniup.com';
        Vue.prototype.$cdnDomain = 'http://cdn.xxx.com';
        Vue.prototype.$apiDomain = apiDomain;
        Vue.prototype.$token     = "";
        Vue.component(upload.name, upload);
    }
};
