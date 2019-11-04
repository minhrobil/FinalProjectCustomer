import React, { Component } from "react";
import { connect } from "react-redux";
import ReactQuill from 'react-quill';
import BaseIntegerList from 'Components/Elements/BaseIntegerList';
import BaseSelect from 'Components/Elements/BaseSelect';
import { Form, Input, Row, Col, Tabs, Modal, Radio, Button } from "antd";
import PropTypes from "prop-types";
import IntlMessages from "Util/IntlMessages";
import BaseCheckBoxList from "../../../Components/Elements/BaseCheckboxes";
import { getAllCountry } from "../../../actions/CountryActions";
import { getAllCategory } from '../../../actions/CategoryActions';
import BaseRadioList from "../../../components/Elements/BaseRadios";

class AddTour extends Component {
    static propTypes = {
        item: PropTypes.object,
        onSaveItem: PropTypes.func,
        open: PropTypes.bool,
        onItemClose: PropTypes.func
    };

    static defaultProps = {
        item: {},
        edit: false,
        open: false
    };

    state = {
        item: null,
        value: 1
    };

    componentDidMount() {
        this.props.getAllCategory();
        this.props.getAllCountry({ paging: false })
    }

    onChangeData(event) {
        var target = event.target;
        var name = target.name;
        var value = target.type === "checked" ? target.checked : target.value;
        if (name === "status") {
            value = target.value === 1 ? true : false;
            console.log("value", value);
        }
        this.setState({
            [name]: value
        });
    }

    onHandleClose = () => {
        this.setState({
            ...this.state,
            open: !this.state.open
        });
    };

    Update = event => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var item = {
                    ...values
                };
                this.props.onSaveItem(
                    item,
                    this.props.item ? this.props.item.id : null
                );
            }
            this.setState({
                item: null
            });
        });
    };

    render() {

        const { item, open, onTourClose, edit, tours, countries, categories } = this.props;

        const { TabPane } = Tabs;

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
                xs: { span: 24 },
                sm: { span: 0 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 }
            }
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

        const stype = [
            { id: "package", title: "Full Package" },
            { id: "land", title: "Land" }
        ];
        const { getFieldDecorator } = this.props.form;

        return (
            <React.Fragment>
                {
                    open ? (
                        <Modal
                            title={
                                edit ? (
                                    <IntlMessages id="global.edit" />
                                ) : (
                                    <IntlMessages id="global.create" />
                                )
                            }
                            visible={open}
                            closable={false}
                            footer={null}
                            width="50%"
                        >
                            <Form
                                onSubmit={this.Update}
                                {...formItemLayout}
                                style={{ width: "100%" }}
                            >
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Basic" key="1">
                                        <Form.Item label={<IntlMessages id="global.title" />}>
                                            {
                                                getFieldDecorator("title", {
                                                    rules: [
                                                        { required: true, message: "Please input your title!" }
                                                    ],
                                                    initialValue: item ? item.title || "" : ""
                                                })
                                                    (<Input style={{ width: "100%" }} />)
                                            }
                                        </Form.Item>
                                        <Form.Item label={<IntlMessages id="global.code" />}>
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    {
                                                        getFieldDecorator("code", {
                                                            rules: [
                                                                { required: true, message: "Please input your code!" }
                                                            ],
                                                            initialValue: item ? item.code || "" : ""
                                                        })(
                                                            <Input style={{ width: "100%" }} />
                                                        )
                                                    }
                                                </Col>
                                                <Col span={12}>
                                                    {
                                                        getFieldDecorator('stype', {
                                                            initialValue: item ? item.stype : ""
                                                        })(
                                                            <BaseRadioList 
                                                                options={stype}
                                                                onChange={(value) => { console.log(value) }} 
                                                            />
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item label={<IntlMessages id="global.country" />}>
                                            {
                                                getFieldDecorator('country_id', {
                                                    initialValue: item ? item.country_id : ""
                                                })(
                                                    <BaseSelect 
                                                        options={countries} 
                                                        selected={item ? item.country_id : ""} 
                                                    />
                                                )
                                            }
                                        </Form.Item>
                                        <Form.Item label={<IntlMessages id="global.category" />}>
                                            {
                                                getFieldDecorator('cat_ids', {
                                                    initialValue: item ? item.cat_ids : ""
                                                })(
                                                    <BaseSelect 
                                                        mode="multiple" 
                                                        options={categories} 
                                                        selected={item ? item.cat_ids : ""} 
                                                    />
                                                )
                                            }
                                        </Form.Item>
                                        <Form.Item label={<IntlMessages id="global.days" />}>
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    {
                                                        getFieldDecorator('days', {
                                                            initialValue: item ? item.days : ""
                                                        })(
                                                            <BaseIntegerList 
                                                                min={1} 
                                                                max={20} 
                                                                defaultText="Select one..." 
                                                                onChange={(value) => { console.log(value) }} 
                                                            />
                                                        )
                                                    }
                                                </Col>
                                                <Col span={12}>
                                                    {
                                                        getFieldDecorator('nights', {
                                                            initialValue: item ? item.nights : ""
                                                        })(
                                                            <BaseIntegerList 
                                                                min={1} 
                                                                max={20} 
                                                                onChange={(value) => { console.log(value) }} 
                                                            />
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item label={<IntlMessages id="tour.cutofftime" />}>
                                            {
                                                getFieldDecorator("cutofftime", {
                                                    rules: [
                                                        { required: true, message: "Cutoff time in hour!" }
                                                    ],
                                                    initialValue: item ? item.code || "" : ""
                                                })(
                                                    <Input style={{ width: "100%" }} />
                                                )
                                            }
                                        </Form.Item>
                                        <Form.Item label={<IntlMessages id="global.status" />}>
                                            {
                                                getFieldDecorator("status", {
                                                    initialValue: item ? (item.status ? 1 : 0) : 1
                                                })(
                                                    <BaseRadioList 
                                                        options={
                                                            [
                                                                {id: 0, title: <IntlMessages id="global.deactivate" />},
                                                                {id: 1, title: <IntlMessages id="global.active" />},
                                                            ]
                                                        }
                                                        onChange={(value) => { console.log(value) }} 
                                                    />
                                                )
                                            }
                                        </Form.Item>
                                    </TabPane>
                                    <TabPane tab="Description" key="2">
                                        <Form.Item {...formDesc}>
                                            {
                                                getFieldDecorator("description", {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: "Please input your description!"
                                                        }
                                                    ],
                                                    initialValue: item != null ? item.description || "" : ""
                                                })(
                                                    <ReactQuill 
                                                        modules={modules} 
                                                        formats={formats} 
                                                        placeholder="Enter Description..." 
                                                    />
                                                )
                                            }
                                        </Form.Item>
                                    </TabPane>
                                    <TabPane tab="Terms" key="3">
                                        <Form.Item {...formDesc}>
                                            {
                                                getFieldDecorator("condition", {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: "Please input your description!"
                                                        }
                                                    ],
                                                    initialValue: item != null ? item.condition || "" : ""
                                                })(
                                                    <ReactQuill 
                                                        modules={modules} 
                                                        formats={formats} 
                                                        placeholder="Enter Description..." 
                                                    />
                                                )
                                            }
                                        </Form.Item>
                                    </TabPane>
                                </Tabs>
                                <Row>
                                    <Col span={24} style={{ textAlign: "right" }}>
                                        <Button
                                            style={{ marginLeft: 8 }}
                                            type='default'
                                            onClick={() => this.props.onitemClose()}
                                        >
                                            <IntlMessages id="global.cancel" />
                                        </Button>
                                        <Button
                                            type="primary"
                                            style={{ marginLeft: 8 }}
                                            htmlType="submit"
                                            loading={this.props.loading}
                                        >
                                            <IntlMessages id="global.submit" />
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>
                    ) : null
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        countries: state.country.listCountry,
        categories: state.category.listCategory
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCountry: (filter) => dispatch(getAllCountry(filter)),
        getAllCategory: (filter) => dispatch(getAllCategory(filter))
    };
};

const AddTourForm = Form.create({ name: "AddTour" })(AddTour);

export default connect(mapStateToProps, mapDispatchToProps)(AddTourForm);
