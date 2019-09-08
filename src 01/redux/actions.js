/* 创建多个action对象  工厂函数模块*/
  import {INCREMENT,DECREMENT} from "./action-types";
/* 返回增加action对象 */
export const incerment=number=>({type:INCREMENT,number})

/* 减少的 */
export const decerment=number=>({type:DECREMENT,number})
