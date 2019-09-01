/* 
在内存存储数据的工具对象
*/
// 存储当前登陆用户
const user = JSON.parse(localStorage.getItem('user_key') || '{}')

export default{
   user 
}