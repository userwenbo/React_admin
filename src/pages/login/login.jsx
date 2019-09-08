import React, { Component } from "react";
import { Form, Icon, Input, Button ,message} from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../redux/actions";
import logo from "../../assets/images/logo.png";
import { reqLogin} from '../../api'
import "./login.less";
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'



class Login extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const form = this.props.form;
    form.validateFields(async (error, {username, password}) => {
      if (!error) {
        this.props.login({ username, password });
      // const result =await reqLogin(username,password)  //返回promise,不想用 await
      // if(result.status===0){    //請求成功
      //   const user = result.data  //請求登錄失敗        respones.data是axios中封裝的data 存放响应体数据
      //                                 //result.data是接口中的data   有一个对象属性
      //   // localStorage.setItem('user_key',JSON.stringify(user)) 
      //   storageUtils.saveUser(user)
      //   memoryUtils.user=user                                            //只能存文本  如果存对象 要tostring [object onject]                         
      //   this.props.history.replace('/')       //要转化为json
      // }else{      
      //    message.error(result.msg)
      // }
      } else {
        console.log("前台表单验证失败");
      }
    }); 
  };

  validatePwd = (rule, value, callback) => {
    value = value.trim();
    if (!value) {
      callback("请输入密码");
    } else if (value.length > 12) {
      callback("密码不能大于12位");
    } else if (value < 4) {
      callback("密码");
    } else if (!/^[a-zA-Z0-9]*$/.test(value)) {
      callback("密码只能包含英文、数字或下划线!");
    } else {
      callback();
    }
  };
  render() {
    const user = this.props.user
    // 如果登陆
    if (user._id) {
      // 自动跳转到admin
      return <Redirect to="/"></Redirect>
    }
    // const form = this.props.form;
    const getFieldDecorator = this.props.form.getFieldDecorator;

    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          {user.msg?<div style={{color:'red'}}>{user.msg}</div>:null}
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                initialvalue: "",
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "必须输入用户名"
                  },
                  { min: 4, message: "用户名不能小于4位!" },
                  { max: 12, message: "用户名不能大于12位" },
                  {
                    pattern: /^[a-zA-Z0-9]*$/,
                    message: "用户名只能包含英文、数字或下划线!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                initialValue: "", // 指定输入框的初始值
                rules: [{ validator: this.validatePwd }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedLogin = Form.create()(Login);
export default connect(
   state=>({
      user:state.user
   }),
   {login}
)(WrappedLogin);
