import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import  logo   from '../../assets/images/logo.png'
import { Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig'

import "./index.less"
const { SubMenu ,Item} = Menu;

 class LeftNav extends Component {
  getMenuNodes=(menuList)=>{
    const path=this.props.location.pathname
     return menuList.map(item=>{
        if(!item.children){
            return (
              <Item key={item.key}>
                 <Link to={item.key}>
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
export default withRouter(LeftNav)
/*
1. 刷新/点击时, 选中相应的菜单项
  a. 使用withRouter()包装LeftNav, 向其传入history/location/match
  b. 通过location得到当前请求的路由路径
  c. 通过: selectedKeys=[路由路径]

 2. 如果选中是二级菜单项, 展开对应的SubMenu的二级菜单列表*/
