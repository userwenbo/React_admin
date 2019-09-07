import React, { Component } from 'react'
import {Card,Icon,Input,Form,Select,Button,message} from "antd";
import LinkButton from '../../components/link-button'
import { reqCategorys, addOrUpProduct } from "../../api";
import PicturesWall from "./pictureswall";
const   {Item}=Form
const   {Option}=Select
 class ProductAddUpdate extends Component {
   state = {
     categorys: []
   };
   // 创建一个ref容器对象, 并保存在组件对象上
   pwRef=React.createRef()

   handleSubmit=(event)=>{
      event.preventDefault() 
      this.props.form.validateFields(async (error,values)=>{   //表单统一进行验证   
           if(!error){
               const {name,desc,price,categoryId}=values
              //  console.log(name, desc, price, categoryId);
               const imgs=this.pwRef.current.getImgs()
              //  console.log("imgs", imgs);
               /* 请求添加或更新商品 */
               const product = { name, desc, price, categoryId ,imgs};
               if(this.props.location.state){
                   //更新
                   product._id=this.props.location.state._id
               }
                 
              const result=await addOrUpProduct(product)
              if(result.status===0){
                 message.success('操作商品成功')
                 this.props.history.replace('/product')
              }else{
                message.error('操作商品失败')
              }
           } 
      })    
   }
   getCategorys = async () => {
     const result = await reqCategorys();
     if (result.status === 0) {
       const categorys = result.data;
       this.setState({
         categorys
       });
     }
   };
   validatePrice = (rule, value, callback) => {
     if (value <= 0) {
       callback("价格不能小于或等于0");
     } else {
       callback();
     }
   };
   componentDidMount() {
     this.getCategorys();
   }
   render() {
     const { categorys } = this.state;
     const product = this.props.location.state || {};
     const { getFieldDecorator } = this.props.form;
     const title = (
       <>
         <LinkButton onClick={() => this.props.history.goBack()}>
           <Icon type="arrow-left"></Icon>
         </LinkButton>
         <span>{product._id?"修改商品":"添加商品"}</span>
       </>
     );
     const formItemLayout = {
       labelCol: { span: 2 },
       wrapperCol: { span: 8 }
     };
     return (
       <Card title={title}>
         <Form onSubmit={this.handleSubmit} {...formItemLayout}>
           <Item label="商品名称">
             {getFieldDecorator("name", {
               initialValue: product.name,
               rules: [
                 { required: true, whitespace: true, message: "请输入商品名称" }
               ]
             })(<Input placeholder="商品名称" />)}
           </Item>
           <Item label="商品描述">
             {getFieldDecorator("desc", {
               initialValue: product.desc,
               rules: [
                 { required: true, whitespace: true, message: "请输入商品描述" }
               ]
             })(<Input placeholder="商品描述" />)}
           </Item>
           <Item label="商品价格">
             {getFieldDecorator("price", {
               initialValue: product.price && "" + product.price, //如果前面有值的话，用右边的
               rules: [
                 //没有值的话用左边的
                 {
                   required: true,
                   whitespace: true,
                   message: "请输入商品价格"
                 },
                 { validator: this.validatePrice }
               ]
             })(<Input type="number" placeholder="商品价格" addonAfter="元" />)}
           </Item>
           <Item label="商品分类">
             {getFieldDecorator("categoryId", {
               initialValue: product.categoryId || "",
               rules: [
                 { required: true, whitespace: true, message: "请输入商品分类" }
               ]
             })(
               <Select>
                 <Option value="">未选择</Option>
                 {categorys.map(c => (
                   <Option key={c._id} value={c._id}>
                     {c.name}
                   </Option>
                 ))}
               </Select>
             )}
           </Item>
           <Item label="商品图片" wrapperCol={{span:15}}>
             <PicturesWall imgs={product.imgs} ref={this.pwRef}></PicturesWall>
           </Item>
           <Item label="商品详情">别担心以后会有钱的</Item>
           <Button type="primary" htmlType="submit">
             提交
           </Button>
         </Form>
       </Card>
     );
   }
 }
export default Form.create()(ProductAddUpdate)
