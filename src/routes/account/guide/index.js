
import { Table } from 'antd';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { batchDelete, createACCOUNT, getAllACCOUNT, updateACCOUNT } from '../../../actions/AccountAction';
import ImageInTable from '../../../components/ImageInTable';
import StatusButton from '../../../components/StatusButton';
import TableActionBar from '../../../components/TableActionBar';
import AddGuide from './AddGuide';


class Listguide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                sort: {
                    type: "asc",
                    attr: ""
                },
                search: "",
                paging: {
                    perpage: 10,
                    page: 1
                }
            },
            addGuideState: false,
            selectedRowKeys: [],
            isSubmiting: false,
            current_account: null,
            edit: false
        }
    }
    componentDidMount() {
        this.props.getAllGuide(this.state.filter, 'guide')
    }
    onChangePerpage(current, size) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                paging: {
                    perpage: size,
                    page: current
                }
            }
        }, () => this.props.getAllGuide(this.state.filter, 'guide'))
    }
    onChangePage(page, pageSize) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                paging: {
                    perpage: pageSize,
                    page: page
                }
            }
        }, () => this.props.getAllGuide(this.state.filter, 'guide'))
    }
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };
    onAddAccount = () => {
        this.setState({ addGuideState: true });
    };
    onEditAccount(account) {
        this.setState({ addGuideState: true, current_account: account, edit: true });
    };
    onAccountClose = () => {
        this.setState({ addGuideState: false, current_account: null, isSubmiting: false, edit: false });
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
                    addGuideState: false,
                    current_account: null,
                    edit: false
                })
            }).catch(err => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                })
            });
        }
        else await this.props.createGuide(data).then(res => {
            this.setState({
                ...this.state,
                isSubmiting: false,
                addGuideState: false,
                current_account: null,
                edit: false
            })
        }).catch(err => {
            this.setState({
                ...this.state,
                isSubmiting: false,

            })
        });
    };
    onRefresh() {
        this.props.getAllGuide(this.state.filter, 'guide');
        this.setState({
            selectedRowKeys: []
        })
    }
    getOrder(order) {
        if (order === "ascend") return "asc";
        if (order === "descend") return "desc";
        return "";
    }

    onChangeTable = (pagination, filters, sorter, extra = { currentDataSource: [] }) => {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                paging: {
                    page: pagination.current,
                    perpage: pagination.pageSize
                },
                sort: {
                    type: this.getOrder(sorter.order),
                    attr: sorter.columnKey
                }
            }
        }, () => this.props.getAllGuide(this.state.filter, 'guide'))

    }

    onDelete() {
        this.props.delete({ id: this.state.selectedRowKeys }).then(() => {
            this.setState({
                selectedRowKeys: []
            })
        })
    }
    filter = (value, name, type) => {
        if (type === "search") {
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    search: value
                }
            }, () => this.props.getAllGuide(this.state.filter, 'guide'))

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
            }, () => this.props.getAllGuide(this.state.filter, 'guide'))
    }
    render() {
        const { selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [
            {
                key: 'image',
                title: <IntlMessages id="global.image" />,
                dataIndex: 'image',
            },
            {
                key: 'status',
                title: <IntlMessages id="global.status" />,
                dataIndex: 'status',
            },
            {
                title: <IntlMessages id="global.firstname" />,
                dataIndex: 'firstname',
                key: 'firstname',
                sorter: true
            },
            {
                title: <IntlMessages id="global.lastname" />,
                dataIndex: 'lastname',
                key: 'lastname',
                sorter: true
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: <IntlMessages id="global.mobile" />,
                dataIndex: 'mobile',
                key: 'mobile',
                sorter: true

            },
            {
                title: <IntlMessages id="global.city" />,
                dataIndex: 'city',

            },
            {
                title: <IntlMessages id="global.created" />,
                dataIndex: 'created_at',
                key: 'created_at'
            },
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id'
            },
        ];

        const { listGuide, paging } = this.props;
        const data = listGuide.map(item => {
            return {
                ...item,
                status: (
                    <StatusButton data_id={item.id} status={item.status} table='guide' />

                ),
                image: (
                    <ImageInTable height='50px' src={item.image} alt={`${item.name}_logo`}></ImageInTable>
                ),
                created_at: (
                    <span>
                        {moment(item.created_at).format('DD/MM/YYYY')}
                    </span>
                ),
                email: <p style={{ cursor: "pointer", color: "blue" }} onClick={() => this.onEditAccount(item)}>{item.email}</p>
            }
        })
        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <div className="row">
                        <RctCollapsibleCard heading="List Guide" colClasses='col-12'>
                            <TableActionBar
                                onAdd={() => this.onAddAccount()}
                                onDelete={() => this.onDelete()}
                                onRefresh={() => this.onRefresh()}
                                isDisabled={!hasSelected}
                                rows={this.state.selectedRowKeys}
                                table='Guide'
                                isShowPublishButtons={true}
                                showFilter={false}
                                onFilter={this.filter}
                            >
                                {hasSelected ? <p className='ml-10' style={{ display: 'inline-block' }}>Selected {selectedRowKeys.length} {selectedRowKeys.length === 1 ? 'item' : 'items'} </p> : ''}

                            </TableActionBar>


                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={data}
                                tableLayout="auto"
                                rowKey="id"
                                pagination={{
                                    pageSizeOptions: ['1', '5', '10', '20', '50'],
                                    total: paging.count,
                                    onChange: (page, pageSize) => this.onChangePage(page, pageSize),
                                    showSizeChanger: true,
                                    onShowSizeChange: (current, size) => this.onChangePerpage(current, size)

                                }}
                                onChange={this.onChangeTable}
                            />

                        </RctCollapsibleCard>
                    </div>
                </div>

                <AddGuide
                    open={this.state.addGuideState}
                    onSaveAccount={this.onSaveAccount}
                    onAccountClose={this.onAccountClose}
                    loading={this.state.isSubmiting}
                    edit={this.state.edit}
                    account={this.state.current_account}
                />
            </React.Fragment >

        );
    }
}
const mapStateToProps = (state) => {
    return {
        listGuide: state.account.listAccount,
        paging: state.account.paging
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGuide: (filter, data) => dispatch(getAllACCOUNT(filter, data)),
        createGuide: (account) => dispatch(createACCOUNT(account)),
        updateAccount: (account) => dispatch(updateACCOUNT(account)),
        delete: (data) => dispatch(batchDelete(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Listguide));