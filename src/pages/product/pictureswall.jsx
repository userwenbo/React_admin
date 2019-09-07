import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from "antd";
import { reqDeleImg } from "../../api";
import { BASE_IMG_PATH } from "../../utils/constants";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
        static propTypes={
           imgs:PropTypes.array
        }
          
          constructor(props){
            super(props)
            let fileList=[]
            const {imgs}=this.props
            if(imgs&&imgs.length>0){
          fileList= imgs.map((img, index) => ({
                 uid: index,
                 name: img,
                 status: "done",
                 url: BASE_IMG_PATH + img
               }));
            }
          this.state = {
              previewVisible: false,
              previewImage: "", //大图的url或base64
              fileList //已上传文件列表
            };
          }
            /* 
               返回所有已上传图片文件名的数组
                 */
             getImgs=()=>this.state.fileList.map(file=>file.name)   
          /* 隐藏大图预览 */
          handleCancel = () => this.setState({ previewVisible: false });

          handlePreview = async file => {
            if (!file.url && !file.preview) {
              file.preview = await getBase64(file.originFileObj);
            }

            this.setState({
              previewImage: file.url || file.preview,
              previewVisible: true
            });
          };
                  //改变状态的那个file对象 
          handleChange =async ({file,fileList }) =>{
             console.log('handleChange()',file.status,file.percent,fileList.length)
             if(file.status==='done'){
                file=fileList[fileList.length-1]  
                const {name,url}=file.response.data
                file.name=name
                file.url=url
             }else if(file.status==='removed'){
                    const result=await reqDeleImg(file.name)
                    if(result.status===0){
                        message.success('删除图片成功')
                    }
             }
             /* 更新列表 */
               this.setState({ fileList })
            };

          render() {
            const { previewVisible, previewImage, fileList } = this.state;
            const uploadButton = (
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
            );
            return (
              <div className="clearfix">
                <Upload
                  action="/manage/img/upload"
                  name="image"   /*指定参数名*/
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
                >
                  <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
              </div>
            );
          }
        }
