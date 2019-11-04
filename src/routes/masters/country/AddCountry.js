import { Button, Col, Form, Input, Modal, Radio, Row, Tabs } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import IntlMessages from 'Util/IntlMessages';
import PicturesWall from '../../../components/Elements/UploadImage';
class AddCountry extends Component {
    static propTypes = {
        country: PropTypes.object,
        onSaveCountry: PropTypes.func,
        open: PropTypes.bool,
        onCountryClose: PropTypes.func,
        edit: PropTypes.bool,
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var country = { ...values }
                this.props.onSaveCountry(country, this.props.country ? this.props.country.id : null)
            }
        })
    }
    render() {
        const { country, open, onCountryClose, edit } = this.props;
      
        
        const { getFieldDecorator } = this.props.form;
        const { TabPane } = Tabs;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const formItemLayoutContent = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };
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
        return (
            <React.Fragment>
                {
                    open ?
                        <Modal
                            title={
                                edit ?
                                    <IntlMessages id="country.editCountry" />
                                    :
                                    <IntlMessages id="country.addCountry" />
                            }
                            toggle={onCountryClose} visible={open}
                            closable={false}
                            footer={null}
                            width="50%"
                        >
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Tabs defaultActiveKey="1" type="card">
                                    <TabPane tab={<IntlMessages id="global.tabbasic" />} key="1">
                                        <Form.Item label="Title">
                                            {
                                                getFieldDecorator('title', {
                                                    rules: [

                                                        {
                                                            required: true,
                                                            message: 'Please input your name country !'
                                                        }
                                                    ],
                                                    initialValue: country ? country.title || "" : ""
                                                })(<Input />)
                                            }
                                        </Form.Item>
                                        <Form.Item label="Code">
                                            {
                                                getFieldDecorator('code', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input code!'
                                                        }
                                                    ],
                                                    initialValue: country ? country.code || "" : ""
                                                })(<Input />)
                                            }
                                        </Form.Item>
                                        <Form.Item label="Phone_Code">
                                            {
                                                getFieldDecorator('phone_code', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input phone_code!'
                                                        }
                                                    ],
                                                    initialValue: country ? country.phone_code || "" : ""
                                                })(<Input />)
                                            }
                                        </Form.Item>
                                        {/* <Form.Item label="Guidelang">
                                            {
                                                getFieldDecorator('guidelang', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input Guidelang!'
                                                        }
                                                    ],
                                                    initialValue: country ? country.guidelang || "" : ""
                                                })(<Input />)
                                            }
                                        </Form.Item> */}
                                        <Form.Item label={<IntlMessages id="global.status" />}>
                                            {getFieldDecorator("status", {
                                                initialValue:
                                                    country ? (country.status ? 1 : 0) : 1
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
                                                    country ? country.image : null
                                            })(
                                                <PicturesWall></PicturesWall>
                                            )}
                                        </Form.Item>
                                    </TabPane>
                                    <TabPane
                                        tab={<IntlMessages id="country.content" />}
                                        key="2"
                                    >
                                        <Form.Item {...formItemLayoutContent}>
                                            {getFieldDecorator("content", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please input content!"
                                                    }
                                                ],
                                                initialValue: country ? country.content || "" : ""
                                            })(<ReactQuill   modules={modules} formats={formats} placeholder="Enter Content..." />)}
                                        </Form.Item>
                                    </TabPane>
                                </Tabs>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button type="danger" ghost onClick={() => this.props.onCountryClose()}>
                                            Cancel
                            </Button>
                                        <Button type="primary" style={{ marginLeft: 8 }} htmlType="submit" loading={this.props.loading}>
                                            Submit
                            </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                        : null
                }
            </React.Fragment>
        );
    }
}

export default Form.create({ name: "country" })(AddCountry)