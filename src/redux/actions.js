/* 创建多个action对象  工厂函数模块*/
  import {INCREMENT,DECREMENT} from "./action-types";
/* 返回增加action对象 */
export const increment=number=>({type:INCREMENT,number})

/* 减少的 */
export const decrement=number=>({type:DECREMENT,number})
 
/* 异步执行action */
export const incrementAsync = number => {
  return dispatch => {     
    setTimeout(() =>{     //执行异步代码             
      dispatch(increment(number))    //有结果后，分发同步action，可以去发请求
    }, 1000)                                         
  }
}


