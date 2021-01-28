console.log("http.js");
import axios from 'axios';
import { Api_Domain, isBrowser } from "@/environment"
import apis from "@/assets/js/api.js"
let myApp;
// create an axios instance 
const service = axios.create({
  // nginx转发到后端Springboot 
  withCredentials: true,
  // send cookies when cross-domain requests 
  timeout: 1000 * 10,
  // request timeout
  baseURL: Api_Domain
}) // request interceptor 
service.interceptors.request.use(config => {
  // do something before request is sent  
  config.headers['Content-Type'] = 'application/json';
  //  config.headers['Authorization'] = myApp.$cookies.get('token') || "";
  config.headers['Authorization'] = myApp.store.getters.token;
  if (isBrowser && !config.data?.noLoading)
    myApp.store.commit("global/requestLoading");
  return config;
}, error => {
  // do something with request error 
  console.log(error)
  // for debug  
  return Promise.reject(error)
}) // response interceptor 
service.interceptors.response.use(
  /**  * If you want to get http information such as headers or status  * Please return  response => response  */
  /**  * Determine the request status by custom code  * Here is just an example  * You can also judge the status by HTTP Status Code  */
  response => {
    if (isBrowser)
      myApp.store.commit("global/requestLoaded");
    let res = response.data;
    if (res == "" || res == null || res == undefined) return Promise.resolve({});
    if (res.status === 1)
    { return Promise.resolve(res) }
    else if (res.status === false && isBrowser)
    {
      $nuxt.$notify({
        title: '失败警告',
        message: res.message,
        type: 'warning'
      });
    }
    else if (res.status === true && isBrowser && res.message)
    {
      $nuxt.$notify({
        title: '成功提示',
        message: res.message,
        type: 'success'
      });
    }
    return Promise.resolve(res)
  },
  error => {
    if (isBrowser)
    {
      myApp.store.commit("global/requestLoaded");
      let res = error.response;
      if (res && res.status == 401)
      {
        $nuxt.$notify({
          title: '授权警告',
          message: '您没有访问授权，请登录或授权后再试..',
          type: 'warning'
        });
        if (isBrowser)
        {
          $nuxt.$store.commit("user/setUser", {});
          $nuxt.$loginDialog();
        }
      }
      else
        return $nuxt.$notify({
          title: '错误提示',
          message: '后台又挂了...',
          type: 'error'
        });
    }
    return Promise.reject(error)
  }
)
// export default service //导出封装后的axios
//1) 自定义函数
const request = {
  get: (url, params) => {
    try
    {
      params = params || {};
      return service({
        url: url,
        method: 'get',
        params
      });
    } catch (error)
    {
      console.log(error);
    }
  },
  post: (url, params) => {
    try
    {
      return service({
        url: url,
        method: 'post',
        data: params
      })
    } catch (error)
    {
      console.log(error);
    }
  },
  //......
}
export default ({
  app
}, inject) => {
  myApp = app;
  inject('http', request);
  var apiObject = {};
  for (var i in apis)
    apiObject[i] = apis[i](request);
  inject("api", apiObject);
}