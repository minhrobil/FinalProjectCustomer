
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from 'Util/IntlMessages';
import { getAllDestination, batchDelete } from '../../../actions/DestinationActions';
import { publish, unpublish, changeStatus } from '../../../actions/DestinationActions';
import FormCreateDestination from './FormCreateDestination';
import { Checkbox, Table, Icon, Button, Input, Pagination, Tag, Divider } from "antd";
import TableActionBar from '../../../components/TableActionBar';
import StatusButton from '../../../components/StatusButton';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import { getAllCountry } from '../../../actions/CountryActions';
import ImageInTable from '../../../components/ImageInTable';


class ListDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                sort: {
                    type: "asc",
                    attr: ""
                },
                country_id: {
                    type: "=",
                    value: ""
                },
                search: "",
                paging: {
                    perpage: 10,
                    page: 1
                }
            },
            isCreateDestination: false,
            selectedRowKeys: []
        }

    }
    componentDidMount() {
        this.props.getAllDestination(this.state.filter);
        this.props.getAllConuntry();
    }




    closeCreateDestinationModal() {
        this.setState({
            ...this.state,
            isCreateDestination: false
        })
    }
    openCreateDestinationModal() {
        this.setState({
            ...this.state,
            isCreateDestination: true
        })
    }

    createData(listDestination) {
        if (listDestination.length) {
            return listDestination.map((item, index) => {
                return {
                    _id: item.id,
                    data: {
                        index: index + 1 + this.state.filter.paging.perpage * (this.state.filter.paging.page - 1),
                        title: item.title,
                        value: item.value,
                        access: item.access,
                        alias: item.alias,
                        country_name: item.country_name,
                        country_code: item.country_code,
                        phone_code: item.phone_code,
                        intro: item.intro,
                    }
                }
            })
        }
        else return [];
    }


    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    onRefresh() {
        this.props.getAllDestination(this.state.filter);
        this.setState({
            selectedRowKeys: []
        });
    }

    onDelete() {
        this.props.delete({ id: this.state.selectedRowKeys }).then(() => {
            this.setState({
                selectedRowKeys: []
            });
        });
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
        }, () => this.props.getAllDestination(this.state.filter))

    }

    filter = (value, name, type) => {
        if (type === "search") {
            this.setState({
                ...this.state,
                filter: {
                    ...this.state.filter,
                    search: value
                }
            }, () => this.props.getAllDestination(this.state.filter))
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
            }, () => this.props.getAllDestination(this.state.filter))
    }


    render() {
        const columns = [
            {
                title: <IntlMessages id='global.status' />,
                dataIndex: "status",
            },
            {
                title: <IntlMessages id='destination.title' />,
                dataIndex: "title",
                key: "title",
                sorter: true
            },
            {
                title: <IntlMessages id='global.image' />,
                dataIndex: "image",
            },

            {
                title: <IntlMessages id='global.country' />,
                dataIndex: "country_title",
                key: "country_title",
                sorter: true
            },
            {
                title: <IntlMessages id='global.code' />,
                dataIndex: "code",
            },

        ];

        const data = this.props.listDestination.map((item) => {
            return {
                ...item,
                status: (
                    <StatusButton
                        data_id={item.id}
                        status={item.status}
                        table="destination"
                    />
                ),

                title: (
                    <div style={{ textAlign: "left" }}>
                        <Button type="link" onClick={() => this.openCreateDestinationModal()}>
                            {item.parent_id !== 0 ? (
                                <div style={{ paddingLeft: "10px" }}>
                                    <Icon type="right" style={{ paddingRight: "5px" }} />
                                    <span>{item.title}</span>
                                </div>
                            ) : (
                                    item.title
                                )}
                        </Button>
                    </div>
                ),

                image: (
                    <ImageInTable src={item.image} alt={`${item.title}_logo`} />
                ),
            }
        });

        const { selectedRowKeys } = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const { country } = this.props;

        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-xl-12">
                            <RctCollapsibleCard heading={"List Destination " + this.props.paging.count + " Records"}>
                                <div className="mb-20">
                                    <TableActionBar
                                        onAdd={() => this.openCreateDestinationModal()}
                                        onDelete={() => this.onDelete()}
                                        onRefresh={() => this.onRefresh()}
                                        isDisabled={!hasSelected}
                                        rows={this.state.selectedRowKeys}
                                        isShowPublishButtons={true}
                                        table="destination"
                                        onFilter={this.filter}
                                        data={[
                                            {
                                                name: "country_id",
                                                data: country,
                                                placeholder: "Select country..."
                                            },
                                            {
                                                name: "status",
                                                data: [{ id: 1, title: "Unpublic" }, { id: 0, title: "Public" }],
                                                placeholder: "Select status..."
                                            }
                                        ]}
                                        justify="end"
                                    >
                                        {hasSelected ? (
                                            <p
                                                className="ml-10"
                                                style={{ display: "inline-block" }}
                                            >
                                                Selected {selectedRowKeys.length}{" "}
                                                {selectedRowKeys.length === 1 ? "item" : "items"}{" "}
                                            </p>
                                        ) : (
                                                ""
                                            )}
                                    </TableActionBar>
                                    <Table
                                        rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={data}
                                        rowKey="id"
                                        onChange={this.onChangTable}
                                        pagination={{
                                            defaultPageSize: 10,
                                            showSizeChanger: true,
                                            pageSizeOptions: ['5', '10', '20', '30'],
                                            total: this.props.paging.count
                                        }}
                                    />
                                </div>
                            </RctCollapsibleCard>
                        </div>
                    </div>

                </div>

                <Modal isOpen={this.state.isCreateDestination} size="lg">
                    <ModalHeader toggle={() => this.closeCreateDestinationModal()}>
                        Destination Infomation
                    </ModalHeader>
                    <ModalBody>

                        <FormCreateDestination close={() => this.closeCreateDestinationModal()}></FormCreateDestination>
                    </ModalBody>

                </Modal>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        listDestination: state.destination.listDestination,
        paging: state.destination.paging,
        country: state.country.listCountry
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllDestination: (filter) => dispatch(getAllDestination(filter)),
        changeStatus: (data) => dispatch(changeStatus(data)),
        publish: (data) => dispatch(publish(data)),
        unpublish: (data) => dispatch(unpublish(data)),
        delete: (data) => dispatch(batchDelete(data)),
        getAllConuntry: () => dispatch(getAllCountry({ paging: 0 }))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDestination));
