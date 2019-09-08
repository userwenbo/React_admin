import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {incerment,decerment} from './redux/actions'
 
export default class App extends Component {
   static propTypes={
     store:PropTypes.object.isRequired
   }
   increment=()=>{
     const number = this.refs.numberSelect.value*1
     this.props.store.dispatch(incerment(number))  //触发reduce调用 不会直接在这创建action对象
   }
   decrement = () => {
     const number = this.refs.numberSelect.value * 1;
     this.props.store.dispatch(decerment(number))   //需要传一个number值
   };
   incrementIfOdd = () => {
     const number = this.refs.numberSelect.value * 1;
     if(this.props.store.getState()%2===1){
        this.props.store.dispatch(incerment(number))   
     }
     
     }
   incrementAsync=()=>{
     const number = this.refs.numberSelect.value*1
     setTimeout(() => {
       this.props.store.dispatch(incerment(number))  
     }, 1000);   
   }
   

  render() {
    const count=this.props.store.getState()   //返回的就是count值
    return (
      <div>
        <p>click {count} times</p>
        <select ref="numberSelect">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    );
  }
}

