import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal} from 'antd';
import {connect} from "react-redux";
import {logout} from '../../redux/actions'
import { reqWeather } from '../../api'
import menuConfig from  '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../link-button'
import storageUtils from '../../utils/storageUtils'
import './index.less'
const { confirm } = Modal;
 class Header extends Component {
        state={
          currentTime:formateDate(Date.now()),
          dayPictureUrl:'',
          weather:''
        }
       getTitle=()=>{
           const path=this.props.location.pathname
           let title
           menuConfig.forEach(item=>{
               if( item.key===path){
                 title=item.title
               }else if(item.children){
                   const cItem=item.children.find(cItem=>cItem.key===path)
                   if(cItem){
                     title=cItem.title
                   }
               }
           })
           return title
       }
       updateTime=()=>{
     this.intervalId=setInterval(() => {
            this.setState({
            currentTime: formateDate(Date.now())
            })
         }, 1000);
       }
        getWeather = async () => {
          const { dayPictureUrl, weather } = await reqWeather('上海')
          this.setState({
            dayPictureUrl,
            weather
          })
        }
        logout=()=>{
          confirm({
            title: '確定要退出?',
            onOk:()=>{
              //  storageUtils.removeUser()
              //  memoryUtils.user={}
              //  this.props.history.replace('./login')
              this.props.logout()     //状态一旦变化，render就会重新渲染
            },
            onCancel() { 
               console.log('cancel') 
            }
          });
        }
       componentWillUnmount(){
         clearInterval(this.intervalId)
       } 
       componentDidMount(){
         this.updateTime()
         this.getWeather()
       }
  render() {
    const { username } = this.props.user
    const { currentTime, dayPictureUrl, weather} = this.state
    const title=this.props.headerTitle
    return (
      <div className='header'>
        <div className='header-top'>欢迎, {username}  &nbsp;
        <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
           <div className='header-bottom-left'>{title}</div>
           <div className='header-bottom-right'>
            <span>{currentTime}</span>
            {dayPictureUrl ? <img src={dayPictureUrl} alt="weather" /> : null}
            <span>{weather}</span>
           </div>
        </div>
      </div>
    )
  }
}
export default  withRouter(connect(
   state=>({
     headerTitle:state.headerTitle,
     user:state.user
   }),
   {logout}
)(Header))