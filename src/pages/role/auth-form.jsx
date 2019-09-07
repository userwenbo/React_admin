import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Tree} from "antd";
import menuList from "../../config/menuConfig";
const {Item}=Form
const {TreeNode}=Tree
export default class AuthForm extends Component {
  static propTypes={
     role:PropTypes.object
  }
  constructor(props){
    super(props)
    let checkedKeys=[]
    const role=this.props.role    //接口文档返回的
    if(role){
       checkedKeys=role.menus
    }
    this.state={
      checkedKeys  
    }

  }
    getMenus=()=>this.state.checkedKeys
  getTreeNodes=(menuList)=>{
     return menuList.map(item=>{
       return  (<TreeNode title={item.title} key={item.key}>
             {item.children ? this.getTreeNodes(item.children):null}
       </TreeNode>)  
     })
  }
  handleCheck=(checkedKeys)=>{
       this.setState({
         checkedKeys
       });
  }
  componentWillReceiveProps(nextProps){
       const menus=nextProps.role.menus
       this.setState({
          checkedKeys:menus
       })
  }
  render() {
    const {checkedKeys}=this.state
    const {name}=this.props.role
    const formItemLayout={
       labelCol:{span:4},
       wrapperCol:{span:15}
    }
    return (
      <>
        <Item label="角色名称" {...formItemLayout}>
          <Input value={name} disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.handleCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.getTreeNodes(menuList)}
          </TreeNode>
        </Tree>
      </>
    );
  }
}

