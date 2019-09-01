import axios from "axios";
import qs from 'qs'
import {message} from 'antd'
//指定基地址
// axios.defaults.baseURL = 'http://localhost:5000'
/* 将post请求参数转换为urlencoded(默认json格式) */
axios.interceptors.request.use((config)=>{
   let data=config.data
   if(data&&data instanceof Object){
       config.data=qs.stringify(data)
   }
   return config
})
axios.interceptors.response.use(
     response=>{
       return response.data
     },error=>{
       message.error('请求出错: ' + error.message)
       return new Promise(() => {}) // 中断promise链
     }
)
export default axios