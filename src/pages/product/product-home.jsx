import React, { Component } from 'react'
import {Card,Select,Input,Button,Icon,Table,message} from 'antd'
import LinkButton from '../../components/link-button'
import memoryUtils from "../../utils/memoryUtils";
import { reqProducts, reqSearchProducts,reqUpdateStatus } from "../../api";
const {Option}=Select
export default class ProductHome extends Component {
     state = {
    products: [], // 当前页的商品数组
    total: 0, // 总商品数量
    searchType: 'productName',        /* 前台分页和后台分页 */
    searchName: '',
    loading: false
  }
  getProducts=async (pageNum)=>{
     // 显示loading
    this.setState({
      loading: true
    });
    this.current=pageNum
    let result
    const {searchName,searchType}=this.state
    if(this.search&&searchName){
       result = await reqSearchProducts({pageNum,pageSize:2,searchType,searchName}); 
    }else{
      result = await reqProducts(pageNum, 2); 
    }
     
     if(result.status===0){
        const {list,total}=result.data
        this.setState({
          products: list,
          total,
          loading: false
        });
      
     }
  }
  reqUpdateStatus=async (productId,status)=>{
    const result=await reqUpdateStatus(productId,status)
    if(result.status===0){
       message.success('更新商品状态成功')
       this.getProducts(this.current)
    }
  }
  componentWillMount(){
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name"
      },
      {
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        title: "价格",
        dataIndex: "price",
        render: price => "¥" + price
      },
      {
        title: "状态",
        width: 100,
        render: ({_id,status}) => {   /* 1代表下架，2代表在售 */
          let btnText='下架'
          let text='在售'
          if(status===2){
             btnText='上架'
             text='已下架'
          }
          
          return (
            <span>
              <Button type="primary"
               onClick={
                 ()=>this.reqUpdateStatus(_id,status===2?1:2)}
                 >{btnText}
                 </Button>
              <span>{text}</span>
            </span>
          );
        }
      },
      {
        title: "操作",
        width: 100, 
        render: (product) => {
          return (
            <span>
              <LinkButton
                onClick={() =>{
                  //将product保存到共享内存中
                   memoryUtils.product=product
                   this.props.history.push(`/product/detail/${product._id}`)

                }}
              >
                详情
              </LinkButton>
              <LinkButton onClick={()=>{
                 this.props.history.push(`/product/addupdate/`,product);
              }}>修改</LinkButton>
            </span>
          );
        }
      }
    ];
  }
  componentDidMount(){
    this.getProducts(1)
  }
  render() {
     const { products, total, searchType, searchName ,loading} = this.state;
       const extra = (
         <Button type="primary" onClick={()=>{
             this.props.history.push(`/product/addupdate/`)
         }}
         >
           <Icon type="plus"></Icon>
           添加商品
         </Button>
       );
       const title = (
         <div>
           <Select
             value={searchType}
             style={{ width: 180 }}
             onChange={value =>
               this.setState({
                 searchType: value
               })
             }
           >
             <Option key="1" value="productName">
               按名称搜索
             </Option>
             <Option key="2" value="productDesc">
               按描述搜索
             </Option>
           </Select>
           <Input
             placeholder="关键字"
             value={searchName}
             style={{ width: 250, margin: "0 15px" }}
             onChange={event =>
               this.setState({
                 searchName: event.target.value
               })
             }
           ></Input>
           <Button type="primary" onClick={()=>{
               this.search=true    //保存一个标记
               this.getProducts(1)
           }}>
             搜索
           </Button>
         </div>
       );
    return (
       <Card title={title} extra={extra}>
        <Table
        loading={loading}
        bordered
        dataSource={products}
        rowKey="_id"
        columns={this.columns}
        pagination={{

          current:this.current, //当前选中那个代码
          pageSize:2,
          total,
          onChange:this.getProducts
        }}
        >
        </Table>
       </Card>  
    )
  }
}
