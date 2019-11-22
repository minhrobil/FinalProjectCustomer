import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Select, Form, Table, Button, Input, Icon, Divider } from 'antd';

import IntlMessages from 'Util/IntlMessages';
import { NotificationManager } from 'react-notifications';
// actions
import { getAllCountry } from '../../../actions/CountryActions';
import { getAllDestination } from '../../../actions/DestinationActions';
import { updateDepartureInTour, getTourDetail } from '../../../actions/TourActions';

const { Option } = Select;
class DepartureModal extends Component {
    state = {
        selectedCountry: '',
        selectedDestination: '',
        currentDestination: null,
        rows: []
    }

    componentDidMount() {
        this.props.getAllCountry();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.tour !== this.props.tour && nextProps.tour) {
            this.props.getTourDetail(nextProps.tour).then(tour => {
                this.setState({
                    rows: tour.departures
                })
            })
        }

    }

    onChangeCountry(value) {
        this.setState({ selectedCountry: value, selectedDestination: '', currentDestination: null });
        this.props.getAllDestination({
            country_id: {
                type: '=',
                value: value
            },
            // paging: false
        });
    }

    onChangeDestination(value) {
        let temp = this.props.destionations.find(elem => elem.id.toString() === value.toString());

        this.setState({
            selectedDestination: value,
            currentDestination: temp
        })
    }

    addRow() {
        if (this.state.currentDestination) {
            let temp = this.state.rows.find(elem => elem.id.toString() == this.state.currentDestination.id.toString());
            if (!temp) {
                this.setState({
                    rows: [
                        ...this.state.rows,
                        {
                            id: this.state.currentDestination.id,
                            title: this.state.currentDestination.title,
                            price: 0,
                            single_price: 0
                        }
                    ]
                }, () => {
                    this.setState({
                        currentDestination: null,
                        selectedCountry: '',
                        selectedDestination: ''
                    })
                })
            } else {
                NotificationManager.error("This city is existed in list!")
            }
        }
    }

    onChangeData(id, property_name, value) {
        let newRows = this.state.rows;
        let currentRow = newRows.find(elem => elem.id == id);
        currentRow[property_name] = value;

        this.setState({
            rows: newRows
        });
    }

    onDelete(id) {
        let newRows = this.state.rows.filter(elem => {
            return elem.id != id
        });

        this.setState({
            rows: newRows
        });
    }

    onSave() {
        this.props.updateDepartureInTour(
            this.props.tour,
            {
                departure: this.state.rows
            }
        );
    }

    render() {
        var { countries, destionations } = this.props;

        return (
            <div>
                <Modal
                    title={<IntlMessages id="global.status" />}
                    visible={this.props.isVisible}
                    onCancel={this.props.onCloseModal}
                    footer={[
                        <Button key="back" onClick={this.props.onCloseModal}>
                            Close
                        </Button>,
                        <Button key="normal" type="primary" onClick={() => this.onSave()}>
                            Save
                        </Button>
                    ]}
                    width={800}
                >
                    <div>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <Form.Item>
                                <Select
                                    value={this.state.selectedCountry}
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a country"
                                    optionFilterProp="children"
                                    onChange={(value) => this.onChangeCountry(value)}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=''>Select a country</Option>
                                    {
                                        countries.map((country, index) => {
                                            return (
                                                <Option key={index} value={country.id}>{country.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    value={this.state.selectedDestination}
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a destination"
                                    optionFilterProp="children"
                                    onChange={(value) => this.onChangeDestination(value)}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value=''>Select a destination</Option>
                                    {
                                        destionations.map((destionation, index) => {
                                            return (
                                                <Option key={index} value={destionation.id}>{destionation.title}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    disabled={!this.state.currentDestination}
                                    type="primary"
                                    icon="plus"
                                    onClick={() => this.addRow()}
                                >
                                    Add
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="mt-4">
                        <Table
                            pagination={false}
                            rowKey="id"
                            columns={[
                                {
                                    title: 'City',
                                    dataIndex: 'title',
                                    align: 'left'
                                },
                                {
                                    title: 'Price',
                                    dataIndex: 'price',
                                    render: (text, record) => (
                                        <Input placeholder="Price" value={record.price} onChange={(e) => this.onChangeData(record.id, 'price', e.target.value)} />
                                    ),
                                    align: 'left'
                                },
                                {
                                    title: 'Single price',
                                    dataIndex: 'single_price',
                                    render: (text, record) => (
                                        <Input placeholder="Single price" value={record.single_price} onChange={(e) => this.onChangeData(record.id, 'single_price', e.target.value)} />
                                    ),
                                    align: 'left'
                                },
                                {
                                    title: 'Actions',
                                    dataIndex: '',
                                    render: (text, record) => (
                                        <span>
                                            {/* <Button size='small' type="primary">Edit</Button>
                                            <Divider type="vertical" /> */}
                                            <Button size='small' type="danger" onClick={() => this.onDelete(record.id)}>Delete</Button>
                                        </span>
                                    ),
                                    align: 'left'
                                },
                            ]}
                            dataSource={this.state.rows}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        countries: state.country.listCountry,
        destionations: state.destination.listDestination
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCountry: (filter) => dispatch(getAllCountry(filter)),
        getAllDestination: (filter) => dispatch(getAllDestination(filter)),
        updateDepartureInTour: (id, data) => dispatch(updateDepartureInTour(id, data)),
        getTourDetail: (id) => dispatch(getTourDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartureModal);