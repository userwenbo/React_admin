import React, { Component } from 'react'
import {Redirect} from "react-router-dom";

export default class Admin extends Component {
  render() {
    const {username,_id}=JSON.parse(localStorage.getItem('user_key')||'{}')
    if(!_id){
      //一定要return,返回虚拟DOM
       return <Redirect to='/login'></Redirect>
    }
    return (
      <div>
         Hello,{username}
      </div>
    )
  }
}
