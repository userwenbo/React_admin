
import {INCREMENT,DECREMENT} from "./action-types";
/* 管理count状态数据的reducer函数 */
export default function count(state=1,action){  //默认值
  console.log('count()',state,action)
    switch (action.type) {
      case INCREMENT:
        return state+action.number   //特定属性名 统一属性名data   
        break; 
      case DECREMENT:
        return state-action.number
        break;
      default:  //返回初始值
        return state
        break;
    }
}