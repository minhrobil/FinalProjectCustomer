import { Button, Table } from "antd";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { changeStatus, publish, unpublish } from '../../../actions/CommonActions';
import { addCountry, batchDelete, getAllCountry, updateCountry } from '../../../actions/CountryActions';
import StatusButton from '../../../components/StatusButton';
import TableActionBar from '../../../components/TableActionBar';
import AddCountry from "./AddCountry";
import config from '../../../../config';
const { ASSET_URL } = config;
class ListCountry extends Component {

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
            addCountryState: false,
            selectedRowKeys: [],
            isSubmiting: false,
            current_country: null,
            edit: false

        }

    }
    componentDidMount() {
        this.props.getAllCountry(this.state.filter);


    }
    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };


    onAddCountry = () => {
        this.setState({
            addCountryState: true
        })
    }
    onEditCountry(country) {
        this.setState({
            addCountryState: true,
            current_country: country,
            edit: true
        })
    }
    onCountryClose = () => {
        this.setState({
            addCountryState: false,
            current_country: null,
            isSubmiting: false,
            edit: false
        })
    }
    onChangeSearch(event) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                search: event.target.value
            }
        }, () => this.props.getAllCountry(this.state.filter))
    }
    onRefresh() {
        this.props.getAllCountry(this.state.filter);
        this.setState({
            selectedRowKeys: []
        })
    }
    onDelete() {
        this.props.delete({ id: this.state.selectedRowKeys }).then(() => {
            this.setState({
                selectedRowKeys: []
            })
        })
    }
    onChangPage(page, pageSize) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                paging: {
                    perpage: pageSize,
                    page: page
                }
            }
        }, () => {
            this.props.getAllCountry(this.state.filter);
        });
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
        }, () => {
            this.props.getAllCountry(this.state.filter);
        });
    }
    onSaveCountry = async (data, id) => {
        await this.setState({
            ...this.state,
            isSubmiting: true
        })
        if (this.state.edit) {
            var dataSubmit = { ...data, id: id }
            await this.props.updateCountry(dataSubmit).then(res => {
                this.setState({
                    ...this.state,
                    isSubmiting: false,
                    addCountryState: false,
                    current_country: null,
                    edit: false
                })
            }).catch(err => {
                this.setState({
                    ...this.state,
                    isSubmiting: false
                })
            })
        }
        else await this.props.createCountry(data).then(res => {
            this.setState({
                ...this.state,
                isSubmiting: false,
                addCountryState: false,
                current_country: null,
                edit: false
            })
        }).catch(err => {
            this.setState({
                ...this.state,
                isSubmiting: false
            })
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
        }, () => this.props.getAllCountry(this.state.filter))

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
            }, () => this.props.getAllCountry(this.state.filter))

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
            }, () => this.props.getAllCountry(this.state.filter))
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
                title: <IntlMessages id='global.status' />,
                dataIndex: 'status',
                render: (text, record) => (
                    <StatusButton data_id={record.id} status={record.status} table='country' />
                )
            },
            {
                title: <IntlMessages id='country.flag' />,
                dataIndex: 'flag',
                render: (text, record) => (
                    <div className='image_logo'>
                        <img src={ASSET_URL +"assets/img/flag/"+record.flag} alt={`${record.flag}_logo`} />
                    </div>
                ),
            },
            {
                title: <IntlMessages id='country.name' />,
                dataIndex: 'title',
                // key:'title',
                sorter: true,
                render: (text, record) => (
                    <Button
                        type="link"
                        onClick={() => this.onEditCountry(record)}
                    >
                        {record.title}
                    </Button>
                )
            },
            {
                title: <IntlMessages id='country.code' />,
                dataIndex: 'code',
                key: 'code',
                sorter: true
            },
            {
                title: <IntlMessages id='country.phone_code' />,
                dataIndex: 'phone_code',
                key: 'phone_code',
                sorter: true
            },
            {
                title: "ID",
                dataIndex: 'id',
                
            },
        ];
        const { listCountry, paging } = this.props;

        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <div className="row">
                        <RctCollapsibleCard heading="List Country" colClasses='col-12'>
                            <TableActionBar
                                onAdd={() => this.onAddCountry()}
                                onDelete={() => this.onDelete()}
                                onRefresh={() => this.onRefresh()}
                                isDisabled={!hasSelected}
                                rows={this.state.selectedRowKeys}
                                isShowPublishButtons={true}
                                table='country'
                                showFilter={false}
                                onFilter={this.filter}
                            >
                                {hasSelected ? <p className='ml-10' style={{ display: 'inline-block' }}>Selected {selectedRowKeys.length} {selectedRowKeys.length === 1 ? 'item' : 'items'} </p> : ''}
                            </TableActionBar>
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={listCountry}
                                tableLayout="auto"
                                // scroll={{ y: 500, x: 1500 }}
                                rowKey="id"
                                pagination={{
                                    pageSizeOptions: ['1', '5', '10', '20', '50'],
                                    total: paging.count,
                                    onChange: (page, pageSize) => this.onChangPage(page, pageSize),
                                    showSizeChanger: true,
                                    onShowSizeChange: (current, size) => this.onChangePerpage(current, size)

                                }}
                                onChange={this.onChangeTable}
                            />

                        </RctCollapsibleCard>
                    </div>
                </div>
                <AddCountry
                    open={this.state.addCountryState}
                    onSaveCountry={this.onSaveCountry}
                    loading={this.state.isSubmiting}
                    edit={this.state.edit}
                    country={this.state.current_country}
                    onCountryClose={this.onCountryClose}
                />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        listCountry: state.country.listCountry,
        paging: state.country.paging
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCountry: (filter) => dispatch(getAllCountry(filter)),
        delete: (data) => dispatch(batchDelete(data)),
        createCountry: (country) => dispatch(addCountry(country)),
        updateCountry: (country) => dispatch(updateCountry(country))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCountry));
