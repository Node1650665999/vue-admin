import axios from "axios";
/*-------------------axios全局配置-------------------------*/
// 配置请求的统一地址前缀

/*-------------------axios拦截器配置-------------------------*/


/*-------------------封装一些常用的请求方法--------------------*/
/**
 * post请求
 * @param api
 * @param params
 * @returns {AxiosPromise}
 */
function post(api,params){
      let data = params || {};  
      return axios({
          method:"post",
          url: api,
          data
      })
}

/**
 * 上传文件
 * @param api
 * @param params
 * @returns {AxiosPromise}
 */
function postfile(api,params){
  let data = params || {};  
  return axios({
      method:"post",
      url: api,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
  })
}

/**
 * get 请求
 * @param api
 * @param params
 * @returns {AxiosPromise}
 */
function get(api,params){
  return axios({
      method:"get",
      url:api,
      params,
      responseType: 'blob'
  })
}
export default {
    get,
    post,
    postfile
}