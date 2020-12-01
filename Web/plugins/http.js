 console.log("http.js");
 import axios from 'axios';
 import {
   Api_Domain
 } from '~/environment'
 import {
   Message
 } from 'element-ui'
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
     const res = response.data
     //res is my own data 
     if (res.code == 401) {
       //  do somethings when response success  
       Message({
         message: res.message || '您没有权限.',
         type: 'warning',
         duration: 4 * 1000
       })
       return Promise.resolve(res)
     } else {
       return Promise.resolve(res)
     }
   },
   error => {
     let res = error.response;

     if (res && res.status == 401 && process.browser)
       $nuxt.$notify({
         title: '授权警告',
         message: '您没有访问授权，请登录试试..',
         type: 'warning'
       });
     return Promise.reject(error)
   }
 )
 // export default service //导出封装后的axios
 //1) 自定义函数
 const request = {
   get: (url, params) => {
     params = params || {};
     return service({
       url: url,
       method: 'get',
       params
     });
   },
   post: (url, params) => {
     return service({
       url: url,
       method: 'post',
       data: params
     })
   },
   //......
 }
 export default ({
   app
 }, inject) => {
   myApp = app;
   inject('http', request)
 }