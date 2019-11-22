import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { getAllACCOUNT, createACCOUNT, updateACCOUNT, batchDelete } from '../../../actions/AccountAction';
import AddAdmin from './AddAdmin';
import { Table, Modal, message } from 'antd';
import TableActionBar from '../../../components/TableActionBar';

class ListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                sort: {
                    type: "asc",
                    attr: ""
                },
                created_at: {
                    type: "compare",
                    value: {
                        from: "",
                        to: ""
                    }
                },
                title: {
                    type: "like",
                    value: ""
                },
                alias: {
                    type: "=",
                    value: []
                },
                search: "",
                paging: {
                    perpage: 10,
                    page: 1
                }
            },
            addAccountState: false,
            current_account: null,
            selectedRowKeys: [],
            isSubmiting: false,
            edit: false,
        }
    }

    componentDidMount() {
        this.props.getAllAdmin(this.state.filter, 'admin')

    }


    filter = (value, name, type) => {
        console.log(value)
        if (type === "search") {
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    search: value
                }
            }, () => this.props.getAllAdmin(this.state.filter, 'admin'))
        }
        else
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    [name]: {
                        type: "=",
                        value: value
                    }
                }
            }, () => this.props.getAllAdmin(this.state.filter, 'admin'))
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };


    onAddAccount = () => {
        this.setState({ addAccountState: true });
    };
    onEditAccount(account) {
        this.setState({ addAccountState: true, current_account: account, edit: true });
    };
    onAccountClose = () => {
        this.setState({ addAccountState: false, current_account: null, isSubmiting: false, edit: false });
    };

    onSaveAccount = async (data, id) => {
        await this.setState({
            ...this.state,
            isSubmiting: true
        })
        if (this.state.edit) {
            var dataSubmit = { ...data, id: id }
            await this.props.updateAccount(dataSubmit).then(res => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                    addAccountState: false,
                    current_account: null,
                    edit: false
                })
            }).catch(err => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                    // addAccountState: false
                })
            });
        }
        else await this.props.createAdmin(data).then(res => {
            this.setState({
                ...this.state,
                isSubmiting: false,
                addAccountState: false,
                current_account: null,
                edit: false
            })
        }).catch(err => {
            this.setState({
                ...this.state,
                isSubmiting: false,
                // addAccountState: false
            })
        });
    };

    onDelete() {
        this.props.deleteAccount({ id: this.state.selectedRowKeys }).then(res => {
            this.setState({
                ...this.state,
                selectedRowKeys: []
            })
        })
    }

    getOrder(order) {
        if (order === "ascend") return "asc";
        if (order === "descend") return "desc";
        return "";
    }

    onChangTable = (pagination, filters, sorter, extra = { currentDataSource: [] }) => {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                sort: {
                    type: this.getOrder(sorter.order),
                    attr: sorter.columnKey
                },
                paging: {
                    perpage: pagination.pageSize,
                    page: pagination.current
                }
            }
        }, () => this.props.getAllAdmin(this.state.filter, 'admin'))

    }


    render() {
        const columns = [

            {
                title: 'Email',
                width: 200,
                dataIndex: 'email',
                key: 'email',
                // fixed: 'left',
                sorter: true
            },
            {
                title: 'Mobile',
                dataIndex: 'mobile',
                key: 'mobile',
                width: 100,
                sorter: true
            },
            {
                title: 'Firstname',
                dataIndex: 'firstname',
                key: 'firstname',
                width: 100,
            },
            {
                title: 'Lastname',
                dataIndex: 'lastname',
                key: 'lastname',
                width: 100,
            },

        ];

        const { selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const { listAdmin, paging } = this.props;
        var data = listAdmin.map(item => {
            return {
                ...item,
                email: <p style={{ cursor: "pointer", color: "blue" }} onClick={() => this.onEditAccount(item)}>{item.email}</p>
            }
        })
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <div className="row">
                        <RctCollapsibleCard heading="List Admin" colClasses='col-12'>
                            <TableActionBar
                                onAdd={() => this.onAddAccount()}
                                onDelete={() => this.onDelete()}
                                onRefresh={() => this.onRefresh()}
                                isDisabled={!hasSelected}
                                rows={this.state.selectedRowKeys}
                                table='customer'
                                isShowPublishButtons={true}
                             

                                onFilter={this.filter}
                            >
                                <span style={{ marginLeft: 8 }}>
                                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                                </span>
                            </TableActionBar>

                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={data}
                                rowKey="id"
                                pagination={{
                                    pageSizeOptions: ['5', '10', '20', '50'],
                                    total: paging.count,
                                    showSizeChanger: true,
                                }}
                                onChange={this.onChangTable}
                            />
                        </RctCollapsibleCard>
                    </div>
                </div>
                <AddAdmin open={this.state.addAccountState}
                    onSaveAccount={this.onSaveAccount}
                    onAccountClose={this.onAccountClose}
                    loading={this.state.isSubmiting}
                    edit={this.state.edit}
                    account={this.state.current_account}
                />
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listAdmin: state.account.listAccount,
        paging: state.account.paging
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAdmin: (filter, data) => dispatch(getAllACCOUNT(filter, data)),
        createAdmin: (account) => dispatch(createACCOUNT(account)),
        updateAccount: (account) => dispatch(updateACCOUNT(account)),
        deleteAccount: (account) => dispatch(batchDelete(account))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAdmin));