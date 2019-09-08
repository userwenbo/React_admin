import React, { Component } from 'react'
import {Redirect,Switch,Route} from "react-router-dom";
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import {connect} from 'react-redux'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/not-found'


const {Footer, Sider, Content } = Layout;

 class Admin extends Component {
  render() {
    const user = this.props.user
    if(!user._id){
      //一定要return,返回虚拟DOM
       return <Redirect to='/login'></Redirect>
    }
    return (
      <Layout style={{height:'100%'}}>
        <Sider>
          <LeftNav></LeftNav>   {/* 匹配到admin会重新渲染它 不会销毁，会利用原有的去更新 */}
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ backgroundColor: 'white', margin: '20px 20px 0' }}>
                <Switch>
                    <Redirect from='/' to='home' />  {/* 必须是精确匹配 */}
                    <Route path='/home' component={Home} />
                    <Route path='/category' component={Category} />
                    <Route path='/product' component={Product} />
                    <Route path='/role' component={Role} />
                    <Route path='/user' component={User} />
                    <Route path='/charts/bar' component={Bar}/>
                    <Route path='/charts/line' component={Line}/>
                    <Route path='/charts/pie' component={Pie}/>
                    <Route component={NotFound} />
                </Switch>
          </Content>
          <Footer style={{textAlign:'center',color:'rgba(0,0,0,0.5)'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state=>({
    user:state.user
  }),
  {}
)(Admin);