import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllGroups } from '../../../actions/GroupActions';
import BaseCheckBoxList from '../../../Components/Elements/BaseCheckboxes';
import IntlMessages from 'Util/IntlMessages';
import PropTypes from 'prop-types';

import {
    Form,
    Input,
    Row,
    Col,
    Button,
    Modal,
    InputNumber,
} from 'antd';



class AddGuide extends Component {

    static propTypes = {
        account: PropTypes.object,
        onSaveAccount: PropTypes.func,
        open: PropTypes.bool,
        onAccountClose: PropTypes.func
    }

    static defaultProps = {
        account: {
            groupid: []
        },
        edit: false,
        open: false
    }

    state = {
        groupid: [],
        account: null
    }


    async componentDidMount() {
        await this.props.getListGroup();
        let guide = this.props.listGroup.filter(item => item.slug === 'guide')
        this.setState({
            ...this.state,
            groupid: this.props.edit ? this.props.account.groupid : guide.map(item => item.id),
            account: this.props.account
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.account !== state.account) {
            let guide = props.listGroup.filter(item => item.slug === 'guide')
            return {
                ...state,
                groupid: props.edit ? props.account.groups.map(item => item.id) : guide.length ? guide.map(item => item.id) : [null],
                account: props.account
            }
        }
        return state;
    }


    onSetGroup = (name, value) => {
        this.setState({
            groupid: value
        })
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var account = {
                    ...values,
                    groupid: this.state.groupid
                }
                this.props.onSaveAccount(account, this.props.account ? this.props.account.id : null);
            }
        });
    };


    render() {
        const { onAccountClose, open, account, edit } = this.props;
        const { getFieldDecorator } = this.props.form;
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
        return (
            <React.Fragment >
                {open ?
                    <Modal
                        title={edit ?
                            <IntlMessages id="account.saveGuide" /> :
                            <IntlMessages id="account.addGuide" />}
                        toggle={onAccountClose} visible={open}
                        closable={false}
                        footer={null}
                        width="50%"
                    >

                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Form.Item label="First name">
                                {getFieldDecorator('firstname', {
                                    rules: [{ required: true, message: 'Please input your firstname!' }],
                                    initialValue: account ? account.firstname || "" : ""
                                })(<Input style={{ width: '100%' }} />)}
                            </Form.Item>

                            <Form.Item label="Last name">
                                {getFieldDecorator('lastname', {
                                    rules: [{ required: true, message: 'Please input your last name !' }],
                                    initialValue: account ? account.lastname || "" : ""
                                })(<Input style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item label="Username">
                                {getFieldDecorator('username', {
                                    rules: [{ required: false, message: 'Please input your username!' }],
                                    initialValue: account ? account.username || "" : ""
                                })(<Input style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item label="E-mail">
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                    initialValue: account ? account.email || "" : ""
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="Mobile">
                                {getFieldDecorator('mobile', {
                                    rules: [{ required: true, message: 'Please input your phone number!' }],
                                    initialValue: account ? account.mobile || "" : ""
                                })(<InputNumber style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item label="City">
                                {getFieldDecorator('city', {
                                    rules: [{ required: true, message: 'Please input city!' }],
                                    initialValue: account ? account.city || "" : ""
                                })(<Input style={{ width: '100%' }}/>)}
                            </Form.Item>
                          


                           

                            <Form.Item label="Group">
                                <BaseCheckBoxList data={this.props.listGroup} name="groupid" value={this.state.groupid} onChange={this.onSetGroup} />
                            </Form.Item>

                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button style={{ marginLeft: 8 }} type="danger" ghost onClick={() => this.props.onAccountClose()}>
                                        Cancel
                            </Button>
                                    <Button type="primary" style={{ marginLeft: 8 }} htmlType="submit" loading={this.props.loading}>
                                        Submit
                            </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                    : null}
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listGroup: state.group.listGroup

    }
}
function mapDispatchToProps(dispatch) {
    return {
        getListGroup: () => dispatch(getAllGroups()),
    }
}

export default Form.create({ name: "guide" })(
    connect(mapStateToProps, mapDispatchToProps)(AddGuide)
);

