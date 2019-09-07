import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import  logo   from '../../assets/images/logo.png'
import { Menu, Icon} from "antd";
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'

import "./index.less"
const { SubMenu ,Item} = Menu

 class LeftNav extends Component {
   /* 
  判断当前用户是否有此item对应的权限
  */
   hasAuth = item => {
     const user = memoryUtils.user;
     const menus = user.role.menus;
     /* 
    1. 如果当前用户是admin
    2. 如果此item是一个公开的
    3. item的key在menus中
    4. 如果和一个cItem的key在menus中
    */
     if (
       user.username === "admin" ||item.isPublic ||menus.indexOf(item.key) != -1
     ) {
       return true;
     } else if (item.children) {
       return item.children.some(cItem => menus.indexOf(cItem.key) != -1);
     }
      return false;
   };
    
   getMenuNodes = menuList => {
     // 请求的路由路径
     const path = this.props.location.pathname;
     return menuList.reduce((pre, item) => {
       // 如果当前用户有此item对应的权限, 才添加
       if (this.hasAuth(item)) {
         // 向pre中添加<Item>
         if (!item.children) {
           pre.push(
             <Item key={item.key}>
               <Link to={item.key}>
                 <Icon type={item.icon} />
                 <span>{item.title}</span>
               </Link>
             </Item>
           );
         } else {
           // 向pre中添加<SubMenu>
           // 请求的路由路径对应children中某个
           if (item.children.some(item => path.indexOf(item.key)===0)) {
             // 将item的key保存为openKey
             this.openKey = item.key;
           }
           pre.push(
             <SubMenu
               key={item.key}
               title={
                 <span>
                   <Icon type={item.icon} />
                   <span>{item.title}</span>
                 </span>
               }
             >
               {this.getMenuNodes(item.children)}
             </SubMenu>
           );
         }
       }

       return pre;
     }, []);
   };
   componentWillMount() {
     this.menuNodes = this.getMenuNodes(menuList);
   }

   render() {
    const menuNodes = this.menuNodes
    // 读取当前请求的路由路径
    let selectedKey = this.props.location.pathname
    // if(selectedKey.indexOf('/product/'===0)){
    //      selectedKey='/product'
    // }
    const openKey = this.openKey
     return (
       <div className="leftnav">
         <Link to="/home" className="leftnav-header">
           <img src={logo} alt="logo" />
           <h1>硅谷后台</h1>
         </Link>
         <Menu
           mode="inline"
           theme="dark"
           // defaultSelectedKeys={[selectedKey]}       /*两次指定它没有用，只有第一次有用  */
           selectedKeys={[selectedKey]} /* 每次指定都有效果 */
           defaultOpenKeys={[
             openKey
           ]} /* 得不到openkey,因为是先执行后点定义的 */
         >
           {menuNodes}
         </Menu>
       </div>
     );
   }
 }
export default withRouter(LeftNav)
/*
1. 刷新/点击时, 选中相应的菜单项
  a. 使用withRouter()包装LeftNav, 向其传入history/location/match
  b. 通过location得到当前请求的路由路径
  c. 通过: selectedKeys=[路由路径]

 2. 如果选中是二级菜单项, 展开对应的SubMenu的二级菜单列表*/
