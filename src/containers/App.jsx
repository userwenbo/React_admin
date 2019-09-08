/* 容器组件  */
/* import {connect} from "react-redux";
import Counter from "../components/counter";  //引入ui组件
import { incerment, decerment } from "../redux/actions"; */
import { connect } from "react-redux";

import { increment, decrement, incrementAsync } from "../redux/actions";
import Counter from "../components/counter";
/* 生成并返回容器组件 */
/* const mapStateToprops=(state)=>({
  count: state
})

const mapDispatchToProps=(dispatch)=>({
   increment:number => dispatch(incerment(number)),
   decrement:number => dispatch(decerment(number))
}) */
export default connect(
  state => ({
    count: state
  }), //将state转换为ui组件的props
  {
    increment,
    decrement,
    incrementAsync
  } /* 不会原样传入，而传入包装后的函数(包含dispatch) */
)(Counter);