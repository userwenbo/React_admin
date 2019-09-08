import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import { setHeradertitle } from "../../redux/actions"
import  logo   from '../../assets/images/logo.png'
import { Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'

import "./index.less"
const { SubMenu ,Item} = Menu;

 class LeftNav extends Component {
   hasAuth=(item)=>{
     const user = this.props.user
    const menus = user.role.menus
     if (user.username==='admin' || item.isPublic || menus.indexOf(item.key)!=-1) {
      return true
    } else if (item.children) {
      return item.children.some(cItem => menus.indexOf(cItem.key)!=-1)
    }
    return false
  }
  getMenuNodes=(menuList)=>{
    const path=this.props.location.pathname
     return menuList.map(item=>{
       if(this.hasAuth(item)){
       if(!item.children){
         //如果path与item的key匹配，将item的title保存到状态中去
         if(path.indexOf(item.key)===0){
             this.props.setHeradertitle(item.title)
         }
            return (
              <Item key={item.key}> 
                 <Link to={item.key} onClick={()=>this.props.setHeradertitle(item.title)}>
                   <Icon type={item.icon} />
                   <span>{item.title}</span>
                 </Link> 
              </Item>
            )
        }else{
          if(item.children.some(item=>item.key===path)){
               this.openkey = item.key
          }         
          return (
            <SubMenu key={item.key}
            title={
              <span>
                 <Icon type={item.icon}/>
                 <span>{item.title}</span>
              </span>
            }
            >
              {this.getMenuNodes(item.children)}   {/* 自调   */}
            </SubMenu>
          )
        }
       } 
     })
  }
   UNSAFE_componentWillMount(){
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    const selectedKey=this.props.location.pathname     //不是路由组件，所以没有location
    const menuNodes = this.menuNodes                  //每次重新渲染都会执行，优化
    return (
      <div className='leftnav'>
        <Link to='/home' className='leftnav-header'>
            <img src={logo} alt="logo"/>
            <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"  
          // defaultSelectedKeys={[selectedKey]}       /*两次指定它没有用，只有第一次有用  */
          selectedKeys={[selectedKey]}  /* 每次指定都有效果 */
          defaultOpenKeys={[this.openkey]}    /* 得不到openkey,因为是先执行后点定义的 */
        >   
          {menuNodes}     
        </Menu>
      </div>
    )
  }
}
export default withRouter(connect(
   state=>({
     user:state.user
   }),
   {setHeradertitle}
)(LeftNav))
/*
1. 刷新/点击时, 选中相应的菜单项
  a. 使用withRouter()包装LeftNav, 向其传入history/location/match
  b. 通过location得到当前请求的路由路径
  c. 通过: selectedKeys=[路由路径]

 2. 如果选中是二级菜单项, 展开对应的SubMenu的二级菜单列表*/
