import React, { Component } from 'react'
import  {Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from "./product-home";
import ProductDetail from "./product-detail";
import ProductAddUpdate from "./product-add-update";
/**
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={ProductHome} exact />  {/* 精准匹配 */}
        <Route path="/product/detail/:id" component={ProductDetail} />
        {/* 提交一下id */}
        <Route path="/product/addupdate" component={ProductAddUpdate} />
        <Redirect to='/product'/>  {/* 如果没有就重定向 */}
      </Switch>
    );
  }
}
