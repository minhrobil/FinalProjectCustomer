import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import IntlMessages from "Util/IntlMessages";
import PicturesWall from '../../components/Elements/UploadImage';
import ReactQuill from 'react-quill';
import { getAllCategory } from "../../actions/CategoryActions";
import BaseSelect from '../../components/Elements/BaseSelect';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Modal,
  InputNumber,
  Radio,
  Tabs,
  Select,
  Cascader
} from "antd";

class AddCategory extends Component {
  static propTypes = {
    category: PropTypes.object,
    onSaveCategory: PropTypes.func,
    open: PropTypes.bool,
    onCategoryClose: PropTypes.func,
    edit: PropTypes.bool
  };

  componentDidMount() {
    this.props.getAllCategory();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var category = { ...values };
        category.parent_id = category.parent_id[0];

        this.props.onSaveCategory(
          category,
          this.props.category ? this.props.category.id : null
        );
      }
    });
  };

  state = {
    items: [],

  }

  render() {
    const { category, open, onCategoryClose, edit, categories } = this.props;
    // const { items } = this.state;
    // const { Option } = Select;
    // console.log('props:', this.props);

    var parentOptions = categories.map(elem => {
      return {value: elem.id, label: elem.title}
    })
    var selectedOption = null;
    if(category) parentOptions.find(option => option.value = category.parent_id);
    
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
        [{ 'align': [] }],
        ['code-block']
      ],
    };

    const formats = [
      'header',
      'font',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'align',
      'code-block'
    ];

    const { getFieldDecorator } = this.props.form;
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const formDesc = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 0}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 24}
      }
    }
    return (
      <React.Fragment>
        {open ?
          <Modal
            title={
              edit ? (
                <IntlMessages id="category.editCategory" />
              ) : (
                  <IntlMessages id="category.addCategory" />
                )
            }
            toggle={onCategoryClose}
            visible={open}
            closable={false}
            footer={null}
            width="50%"
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Tabs defaultActiveKey="1" type="card">
                <TabPane tab={<IntlMessages id="global.tabbasic" />} key="1">
                  <Form.Item label={<IntlMessages id="global.title" />}>
                    {getFieldDecorator("title", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your title !"
                        }
                      ],
                      initialValue: category ? category.title || "" : ""
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label={<IntlMessages id="global.parent" />}>
                    {getFieldDecorator('parent_id')(<BaseSelect options={parentOptions} />)}
                  </Form.Item>
                  <Form.Item label={<IntlMessages id="global.alias" />}>
                    {getFieldDecorator("alias", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your alias!"
                        }
                      ],
                      initialValue: category != null ? category.alias || "" : ""
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label={<IntlMessages id="global.type" />}>
                    {getFieldDecorator("type", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your type!"
                        }
                      ],
                      initialValue: category != null ? category.type || "" : ""
                    })(<Input />)}
                  </Form.Item>
                  <Form.Item label={<IntlMessages id="global.status" />}>
                    {getFieldDecorator("status", {
                      initialValue:
                        category != null ? (category.status ? 1 : 0) : 1
                    })(
                      <Radio.Group name="radiogroup">
                        <Radio value={1}>
                          <IntlMessages id="global.active" />
                        </Radio>
                        <Radio value={0}>
                          <IntlMessages id="global.deactivate" />
                        </Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                  <Form.Item label={<IntlMessages id="global.image" />}>
                    {getFieldDecorator("image", {
                        initialValue:
                          category ? category.image : null
                      })(
                        <PicturesWall></PicturesWall>
                      )}
                  </Form.Item>
                  {/* <Form.Item label={<IntlMessages id="global.parent" />}> */}
                    {/* <BaseSelect 
                      options={parentOptions}
                        name=""
                    /> */}
                  {/* </Form.Item> */}
                  
                </TabPane>
                <TabPane
                  tab={<IntlMessages id="global.tabdescription" />}
                  key="2"
                >
                  <Form.Item {...formDesc}>
                    {getFieldDecorator("description", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your description!"
                        }
                      ],
                      initialValue: category != null ? category.description || "" : ""
                    })(<ReactQuill modules={modules} formats={formats} placeholder="Enter Description..." />)}
                  </Form.Item>
                </TabPane>
              </Tabs>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button
                    type="default"
                    // ghost
                    onClick={() => this.props.onCategoryClose()}
                  >
                    <IntlMessages id='global.cancel' />
                  </Button>
                  <Button
                    type="primary"
                    style={{ marginLeft: 8 }}
                    htmlType="submit"
                    loading={this.props.loading}
                  >
                    <IntlMessages id='global.submit' />
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal>
          : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.category.listCategory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategory: (filter) => dispatch(getAllCategory(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: "category" })(AddCategory));
