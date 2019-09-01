/* 管理数据 */
import store from 'store'
const USER_KEY='user_key'
export default {
  saveUser(user){
      // localStorage.setItem('user_key',JSON.stringify(user))   //保存
      store.set(USER_KEY, user)
  },
  getUser(){
      // return JSON.parse(localStorage.getItem('user_key')||'{}')  //读取
      return store.get(USER_KEY) || {}
  },
  removeUser(){
      //  localStorage.removeItem('user_key')     //删除
      store.remove(USER_KEY)
  }
}