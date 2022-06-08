import  axios from 'axios'
import {getCookie,removeCookie} from '@/utils/cookie'
const BASEURL = process.env.NODE_ENV === 'production' ?  process.env.VUE_APP_PRO : process.env.VUE_APP_ABC; //判断是dev 还是pro 环境
console.log(BASEURL)
const service = axios.create({
  baseURL: BASEURL,  
  timeout: 50000, //请求超时
  headers: {'Content-Type': 'application/json;charset=UTF-8'}
})

//添加请求拦截
service.interceptors.request.use(function(config){
   let token = getCookie();
   if(token){
     config.headers['Authorization'] = token
   }
   return config
}),function(error){
  return Promise.reject(error)
}

//添加响应拦截
service.interceptors.response.use(
  function(response) {
    // 请求正常则返回,这里返回了所有的请求头和请求体信息
    //return Promise.resolve(response)
    if(response.data.code =='700'){
      removeCookie()
    }else{
      return response.data
    }
  },
  //响应错误该做的事情
  function(error) {
    return Promise.reject(error)
  }
)

export default service
