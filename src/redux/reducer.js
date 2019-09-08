/* 包含n个reducer函数的魔块 */

import {combineReducers} from 'redux'  //合并多个reducer函数
import  {SET_HEADER_TITLE,RECEIVE_USER,SHOW_MSG, LOGOUT} from './action-types'
import storageUtils from '../utils/storageUtils'

const initheaderTitle = '首页'
function headerTitle(state = initheaderTitle, action) {
   switch (action.type) {
     case SET_HEADER_TITLE:
       return action.data
     default:
       return state
   }
}

//管理登录用户的reduer
const initUser = storageUtils.getUser()
function user(state = initUser, action) {
    switch (action.type) {
      case RECEIVE_USER:
        return action.user   //不能直接修改
      case SHOW_MSG:
        return {...state,msg:action.msg}
      case LOGOUT:
        return {msg:'退出成功'}    
      default:
        return state
    } 
}
/* 合并多个reducer函数 
   function(state,action){
   }
   总得state结构
   {
      headerTitle: 2,
      yyy
   }
*/
export default combineReducers({
    headerTitle,
    user
})