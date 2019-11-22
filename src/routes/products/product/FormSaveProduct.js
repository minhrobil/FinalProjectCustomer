import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { saveProduct } from '../../../actions/ProductAction';
import { uploadImage } from '../../../actions/UploadImage';

import { Form, Input, Upload, Icon, Select, Switch, InputNumber,Row,Col,Modal,Button } from 'antd';
import IntlMessages from 'Util/IntlMessages';
import TextArea from 'antd/lib/input/TextArea';
import { add_dot_number, spend_dot_number } from '../../../util/StringHelper';
import { getBase64, getMultipleBase64 } from '../../../util/imageHelper';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }, 
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};
  
class FormSaveProduct extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      description: '',
      price: '',
      sku: '',
      image: [],
      status: '',
      params: '',
      previewVisible: false,
      previewImage: '',
      validate:true,
      status:1,
      fileList: [],
      id:''
    };
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  handleChange = async ({ file,event,fileList }) => {
    this.setState({ fileList,image:await getMultipleBase64(fileList) })
  }
  onClearForm = () => {
    this.setState({
      title: '',
      description: '',
      price: '',
      sku: '',
      cid:'',
      image: [],
      status: '',
      params: '',
      validate:true,
      status:1
    });
  };
  componentDidMount(){
    if(this.props.itemEdit){
      this.setState({
        id:this.props.itemEdit.id,
        title:this.props.itemEdit.title,
        price:this.props.itemEdit.price,
        sku:this.props.itemEdit.sku?this.props.itemEdit.sku:null,
        cid:this.props.itemEdit.cid?this.props.itemEdit.cid:null,
        description:this.props.itemEdit.description, 
        status:this.props.itemEdit.status,
        image:this.props.itemEdit.image?this.props.itemEdit.image:[],
        fileList:this.props.itemEdit.image?this.props.itemEdit.image.map((value,index)=>{
          return {
            uid: index,
            name: 'image.png',
            status: 'done',
            url: value,
          }
        }):[]
      })
    }
  }
  onElementChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };

  checkValidate = () => {
    var { title, price } = this.state;
    if (title === '' || price == '') {
      return false;
    } else {
      return true
    }
  };

  onSubmit = async event => {
    var {
      id,
      title,
      price,
      sku,cid,
      description,
      status,
      image,
    } = this.state;
    var product = {
      title,
      price,
      sku,cid,
      description,
      status,
      image,
    };
    if(id!=''){
      Object.assign(product,{id})
    }
    this.setState({validate:this.checkValidate()},()=>{
      // this.onClearForm();
      if (this.state.validate) {
        this.props.saveProduct(product);
      }
    })
  };  
  componentDidUpdate(PrevProps){
    if(PrevProps.saveProductRes!=this.props.saveProductRes){
      if(this.props.saveProductRes.isSuccess){
        this.props.close()
      }
    }
  }
  onChangePrice(event){
    this.setState({price:event.target.value})
  }
  uploadButton = () => (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    console.log(this.state.status);
    
    return (
      <Form {...formItemLayout}>
          <Form.Item
              style={{margin:0}}
              required={true}
              validateStatus={((!this.state.validate)&&this.state.title == '')?'error':null}
              help={((!this.state.validate)&&this.state.title == '')&&<IntlMessages id="global.required"></IntlMessages>}
              label={<IntlMessages id="create.product.title"></IntlMessages>}
            >
              <Input value={this.state.title} 
                onChange={(event)=>{
                    this.setState({title:event.target.value,validate:true })
                }} placeholder={"Name"} id="title"/>
            </Form.Item>
            <Form.Item
              style={{margin:0}}
              // required={true}
              // validateStatus={((!this.state.validate)&&this.state.title == '')?'error':null}
              // help={((!this.state.validate)&&this.state.title == '')&&<IntlMessages id="global.required"></IntlMessages>}
              label={<IntlMessages id="create.product.sku"></IntlMessages>}
            >
              <Input value={this.state.sku} 
                onChange={(event)=>{
                    this.setState({sku:event.target.value,validate:true })
                }} placeholder={"SKU"} id="sku"/>
            </Form.Item>
            <Form.Item
              style={{margin:0}}
              // required={true}
              // validateStatus={((!this.state.validate)&&this.state.title == '')?'error':null}
              // help={((!this.state.validate)&&this.state.title == '')&&<IntlMessages id="global.required"></IntlMessages>}
              label={<IntlMessages id="create.product.cid"></IntlMessages>}
            >
              <Input value={this.state.cid} 
                onChange={(event)=>{
                    this.setState({cid:event.target.value,validate:true })
                }} placeholder={"CID"} id="cid"/>
            </Form.Item>
            <Form.Item
              style={{margin:0}}
              required={true}
              validateStatus={((!this.state.validate)&&this.state.price == '')?'error':null}
              help={((!this.state.validate)&&this.state.price == '')&&<IntlMessages id="global.required"></IntlMessages>}
              label={<IntlMessages id="create.product.price"></IntlMessages>} 
            >
              <Input placeholder="0" type="text" id="price" value={add_dot_number(this.state.price)} 
                onChange={(event)=>{
                  if(event.target.value.length==0){
                    this.setState({price:spend_dot_number(event.target.value),validate:true })
                  }
                  if(isNaN(event.target.value[event.target.value.length-1])&&event.target.value[event.target.value.length-1]!=""){}else{
                    this.setState({price:spend_dot_number(event.target.value),validate:true })
                  }
                }}/>
            </Form.Item>
            <Form.Item
              style={{margin:0}}
              label={<IntlMessages id="create.product.description"></IntlMessages>}
            >
              <TextArea 
                value={this.state.description} 
                onChange={(event)=>{
                  this.setState({description:event.target.value })
                }} placeholder="description of product" id="description" />
            </Form.Item>
            <Form.Item
              required={true}
              style={{margin:0}}
              label={<IntlMessages id="create.product.status"></IntlMessages>}
            >
              <Switch checkedChildren={"1"} unCheckedChildren="0" checked={this.state.status==0?false:true} onChange={(value)=>{
                if(value){this.setState({status:1})}else{this.setState({status:0})}
              }}/>
            </Form.Item>
              <Form.Item
                style={{marginTop:10}}
                label={<IntlMessages id="create.product.image"></IntlMessages>}
              >
                <Upload
                  accept=".jpg,.png"
                  multiple={true}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 8 ? null : this.uploadButton()}
                </Upload>
              </Form.Item>
        <Row type="flex" justify="center">
          <Col>
          <Form.Item>
            <Button loading={this.props.saveProductRes.isLoading} type="primary" htmlType="submit"
              onClick={()=>{this.onSubmit()}}
            >
              {
                this.state.id==''?
                <IntlMessages id="create.product.button_submit"></IntlMessages>
                :
                <IntlMessages id="update.product.button_submit"></IntlMessages>
              }
            </Button>
          </Form.Item>
          </Col>
        </Row>
        <Modal footer={null}  maskStyle={{width:30}} zIndex={2} title={"Image"}  width="30%" visible={previewVisible} onCancel={this.handleCancel} >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    saveProductRes: state.saveProduct,
    uploadImageRes:state.uploadImage
  };
}
export default connect(
  mapStateToProps,
  {
    saveProduct,
    uploadImage
}
)(Form.create({ name: 'advanced_search' })(FormSaveProduct));
