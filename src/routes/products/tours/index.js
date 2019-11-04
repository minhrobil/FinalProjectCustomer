import TextField from '@material-ui/core/TextField';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import IntlMessages from 'Util/IntlMessages';
import { getAllTour } from '../../../actions/TourActions';

import { Table, Button, Divider, Tag, Modal, Form, Select } from 'antd';
import StatusButton from '../../../components/StatusButton';
import DepartureModal from './DepartureModal';
import TableActionBar from '../../../components/TableActionBar';
import AddTour from './AddTour';

class ListTour extends Component {
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
            selectedRowKeys: [],
            isOpenSetupDepartureModal: false,
            isOpenCreateModal: false,
            destinationFilter: {},
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            currentTour: null
        }

    }
    componentDidMount() {
        this.props.getAllTour(this.state.filter);
    }

    handleChangePage(event, newPage) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                paging: {
                    ...this.state.filter.paging,
                    page: newPage + 1
                }
            }
        }, () => {
            this.props.getAllTour(this.state.filter);
        });
    }

    handleChangeRowsPerPage(event) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                paging: {
                    perpage: +event.target.value,
                    page: 1
                }
            }
        }, () => {
            this.props.getAllTour(this.state.filter);
        });
    }

    openCreateTourModal() {
        this.setState({
            isOpenCreateModal: true
        })
    }

    onChangeSearch(event) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                search: event.target.value
            }
        }, () => this.props.getAllTour(this.state.filter))
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    onCloseModal() {
        this.setState({
            isOpenSetupDepartureModal: false,
            isOpenCreateModal: false,
            currentTour: null
        });
    }

    onRefresh() {
        this.props.getAllTour(this.state.filter);
        this.setState({
            selectedRowKeys: []
        })
    }

    onDelete() {

    }

    render() {
        const columns = [
            {
                key: 2,
                title: <IntlMessages id="global.status" />,
                dataIndex: 'status',
                render: (text, record) => {
                    return (
                        <React.Fragment>
                            {
                                record ? (
                                    <StatusButton data_id={record.id} status={record.status} table='tour' />
                                ) : null
                            }
                        </React.Fragment>

                    )

                }
            },
            {
                title: 'Title',
                dataIndex: 'title',
                sorter: (a, b) => a.title.length - b.title.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'SKU',
                dataIndex: 'code',
            },
            {
                title: 'Duration',
                dataIndex: 'duration',
            },
            {
                title: 'Market',
                dataIndex: 'country_name',
            },
            {
                title: 'Departure',
                dataIndex: '',
                render: (text, record) => {
                    return (
                    <span>
                        <Button 
                            className="p-0" 
                            type="link" 
                            onClick={() => {
                                this.setState({ currentTour: record.id, isOpenSetupDepartureModal: true })
                            }}
                        >
                            Setup Departure
                        </Button>
                    </span>
                )},
            },
            {
                title: 'Itinerary',
                dataIndex: '',
                render: (text, record) =>  (
                    <span>
                        <Link to={`/app/itineraries/${record.id}`}>Setup Itineraries</Link>
                    </span>
                ),
            },
            {
                title: 'Calendar',
                dataIndex: '',
                render: (text, record) => (
                    <span>
                        <Link to={`/app/calendar/${record.id}`}>Setup Availablity</Link>
                    </span>
                ),
            },

        ];

        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
      
        const hasSelected = selectedRowKeys.length > 0;

        const { tours } = this.props;

        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <PageTitleBar title={<IntlMessages id="sidebar.tours" />} match={this.props.match} />
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-xl-12">
                            <RctCollapsibleCard heading="List Tours">
                                
                                <div className="scroll-table">
                                    <div>
                                        <div style={{ marginBottom: 16 }}>
                                            <TableActionBar 
                                                onAdd={() => this.openCreateTourModal()}
                                                onDelete={() => this.onDelete()}
                                                onRefresh={() => this.onRefresh()}
                                                isDisabled={!hasSelected}
                                                rows={this.state.selectedRowKeys}
                                                table='tour'
                                                isShowPublishButtons={true}
                                            />
                                            <span style={{ marginLeft: 8 }}>
                                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                                            </span>
                                        </div>
                                    </div>
                                    <Table rowSelection={rowSelection} columns={columns} dataSource={tours} rowKey="id" />
                                </div>
                            </RctCollapsibleCard>
                        </div>
                    </div>
                </div>

                <DepartureModal 
                    isVisible={this.state.isOpenSetupDepartureModal}
                    onCloseModal={() => this.onCloseModal()}
                    tour={this.state.currentTour}
                />

               <AddTour
                    open={this.state.isOpenCreateModal}
                    edit={false}
                    // onAirlineClose={true}
               />
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        tours: state.tour.listTour,
        paging: state.tour.paging,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllTour: (filter) => dispatch(getAllTour(filter)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListTour));
