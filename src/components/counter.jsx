import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync:PropTypes.func.isRequired
  };
  increment = () => {
    const number = this.refs.numberSelect.value * 1;
    this.props.increment(number); //触发reduce调用 不会直接在这创建action对象
  };
  decrement = () => {
    const number = this.refs.numberSelect.value * 1;
    this.props.decrement(number); //需要传一个number值
  };
  incrementIfOdd = () => {
    const number = this.refs.numberSelect.value * 1;
    if (this.props.count % 2 === 1) {
      this.props.increment(number);
    }
  };
  incrementAsync = () => {
    const number = this.refs.numberSelect.value * 1;
    this.props.incrementAsync(number);
    
  };

  render() {
    const count = this.props.count; //返回的就是count值
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
