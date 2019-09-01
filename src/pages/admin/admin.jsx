import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import memoryUtils from '../../utils/memoryUtils'

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    if(!user._id){
      //一定要return,返回虚拟DOM
       return <Redirect to='/login'></Redirect>
    }
    return (
      <div>
         Hello,{user.username}
      </div>
    )
  }
}
