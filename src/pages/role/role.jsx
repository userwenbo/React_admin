import React, { Component } from 'react'
import {Card,Button,Table,Modal,message} from "antd";
import { connect } from "react-redux";
import {PAGE_SIZE} from '../../utils/constants'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import AddForm from "./add-form"
import AuthForm from "./auth-form";
import {reqRoles,reqAddRole, reqUpdateRole} from '../../api'
import { async } from 'q';
import {formateDate} from "../../utils/dateUtils";
/**
 * 角色管理
 */
 class Role extends Component {
   state={
     roles:[],  //所有角色的列表
     isShowAdd:false,
     isShowAuth:false
   }
  authRef=React.createRef()
  initColum=()=>{
     this.column = [
       {  
         title: "角色名称",
         dataIndex: "name"
       },
       {
         title: "创建时间",
         dataIndex: "create_time",
         render:formateDate
       },
       {
         title: "授权时间",
         dataIndex: "auth_time",
         render:auth_time=>formateDate(auth_time)
       },
       {
         title: "授权人",
         dataIndex: "auth_name"
       },
       {
         title: "操作", /* role显示当前分类利用参数知道 */
         render: (role) => <LinkButton onClick={()=>this.showAuth(role)}>设置权限</LinkButton>   
       }
     ];
  }
    
    /* 
  显示权限设置界面
  */
   showAuth=(role)=>{
      this.role=role
           
      this.setState({
        isShowAuth:true
      })
   }
  /* 异步获取角色列表显示 */
    getRoles=async ()=>{
      const result=await reqRoles()
      if(result.status===0){
          const roles=result.data
          this.setState({
             roles
          })
      }
    }
    /* 添加角色 */
    addRole=()=>{
      this.form.validateFields(async (error,values)=>{
        if(!error){
           this.form.resetFields()
           this.setState({
             isShowAdd:false
           })
          const result =await reqAddRole(values.roleName) 
          
          if(result.status===0){
              message.success('添加角色成功')
              const role=result.data
              const roles=this.state.roles
              this.setState({
                roles:[...roles,role]
              })
              console.log(role)
          }
        }
      })
    }
    /* 设置权限 */
    updateRole=async ()=>{
       this.setState({
         isShowAuth:false
       })
       const role=this.role

       role.menus = this.authRef.current.getMenus()
       role.auth_time=Date.now()
       role.auth_name=this.props.user.username      
       const result=await reqUpdateRole(role)
       if(result.status===0){
           message.success(`给${role.name}授权成功`)
           this.getRoles()
       }
    }
 
  componentWillMount(){
    this.initColum()
  }
  componentDidMount(){
    this.getRoles()
  }
  
  render() {
    const {isShowAdd,isShowAuth,roles}=this.state
    const role=this.role ||{}
     const title=(
        <Button type='primary' onClick={() => this.setState({ isShowAdd: true })}>
          创建角色
        </Button>
     )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.column}
          pagination={{ pageSize: PAGE_SIZE }}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false });
            this.form.resetFields();
          }}
        >
          <AddForm setForm={form => (this.form = form)}></AddForm>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false });
          }}
        >
          <AuthForm ref={this.authRef} role={role}></AuthForm>   
        </Modal>
      </Card>
    );
  }
}

export default connect(
  state=>({
    user:state.user
  }),
  {}
)(Role);