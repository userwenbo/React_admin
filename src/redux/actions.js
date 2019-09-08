/* 包含n个acton creator函数的对象 */
import {SET_HEADER_TITLE,RECEIVE_USER,SHOW_MSG,LOGOUT} from "./action-types";
import {reqLogin} from "../api";
import storageUtils from '../utils/storageUtils'
/* 设置头部标题的同步action */
  export const setHeradertitle=(headetitle)=>({type:SET_HEADER_TITLE,data:headetitle})
  //接受用户的同步action
    const receiveUser=(user)=>({type:RECEIVE_USER,user})
    //显示错误信息的同步action
    const showMsg=(msg)=>({type:SHOW_MSG,msg})
    //退出登录的同步action
  export const logout=()=>{
      //删除local中的user
      storageUtils.removeUser()
     return ({type:LOGOUT}) 
  }
  /* 登录异步action */
  export function login({username,password}){
     return async dispatch=>{
       //执行异步代码ajax请求
          const result = await reqLogin(username,password)
           //分发同步action
          if(result.status===0){
            const user=result.data
             //将user保存到local中
              storageUtils.saveUser(user)
             //分发接受user的同步action
              dispatch(receiveUser(user))
          }else{  //登录失败
              dispatch(showMsg(result.msg))
          } 
     
     }
  }