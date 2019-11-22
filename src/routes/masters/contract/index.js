import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
// import Nav from '../_components/nav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import { getAllDestination } from '../../../actions/DestinationActions';
import { getAllContract } from '../../../actions/ContractActions';
import Contract from './Contract';


class ListContract extends Component {
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
                search: "",
                paging: {
                    perpage: 10,
                    page: 1
                }
            },

        }

    }
    componentDidMount() {
        this.props.getAllContract(this.state.filter).then(res => {

        })
    }
    showContract(listContract) {
        if (listContract.length) {
            return listContract.map((item, index) => {
                return <Contract key={item.id}
                    index={(this.state.filter.paging.page - 1) * this.state.filter.paging.perpage + index + 1}
                    contract={item}
                ></Contract>
            })
        }
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
            this.props.getAllContract(this.state.filter);
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
            this.props.getAllContract(this.state.filter);
        });
    }

    onChangeSearch(event) {
        this.setState({
            ...this.state,
            filter: {
                ...this.state.filter,
                search: event.target.value
            }
        }, () => this.props.getAllContract(this.state.filter))
    }

    render() {


        return (
            <React.Fragment>
                <div className="formelements-wrapper">
                    <PageTitleBar title={<IntlMessages id="sidebar.contract" />} match={this.props.match} />
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-xl-12">
                            <RctCollapsibleCard heading="List Contract">
                                <div className="mb-20">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-xl-3">
                                            <div className="form-group">
                                                <TextField id="search" fullWidth label="Search" value={this.state.filter.search} onChange={(event) => this.onChangeSearch(event)} />
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <div className="scroll-table">
                                    <Table stickyHeader>

                                        <TableHead style={{ backgroundColor: "#5d92f4" }}>
                                            <TableRow>
                                                <TableCell className="background-table-header">No.</TableCell>
                                                <TableCell className="background-table-header">Contact_name</TableCell>
                                                <TableCell className="background-table-header">Hotel_id</TableCell>
                                                <TableCell className="background-table-header">Start</TableCell>
                                                <TableCell className="background-table-header">Contact_email</TableCell>
                                                <TableCell className="background-table-header">Contact_phone</TableCell>
                                                <TableCell className="background-table-header">Contact_address</TableCell>
                                                <TableCell className="background-table-header">Rank</TableCell>
                                                <TableCell className="background-table-header">Name</TableCell>
                                                <TableCell className="background-table-header">City id</TableCell>
                                                <TableCell className="background-table-header">Region id</TableCell>
                                                <TableCell className="background-table-header">Checkin</TableCell>
                                                <TableCell className="background-table-header">Checkout</TableCell>
                                                <TableCell className="background-table-header">Address</TableCell>
                                                <TableCell className="background-table-header">Latitude</TableCell>
                                                <TableCell className="background-table-header">Longitude</TableCell>
                                                <TableCell className="background-table-header">Notes client</TableCell>
                                                {/* <TableCell >notes</TableCell>
                                                <TableCell >commission</TableCell>
                                                <TableCell >End</TableCell>
                                                <TableCell >Sale_id</TableCell>
                                                <TableCell >Amount</TableCell>
                                                <TableCell >Filepath</TableCell>
                                                <TableCell >State</TableCell>
                                                <TableCell >Params</TableCell>
                                                <TableCell >Created</TableCell>
                                                <TableCell >hoteltype_id</TableCell>
                                                <TableCell >avatar</TableCell>
                                                <TableCell >allow_book_online</TableCell>
                                                <TableCell >allow_book_weekend</TableCell>
                                                <TableCell >allow_book_start</TableCell>
                                                <TableCell >allow_book_end</TableCell> */}
                                                <TableCell className="background-table-header">Created</TableCell>
                                                <TableCell className="background-table-header">Updated</TableCell>
                                            </TableRow>
                                        </TableHead>


                                        <TableBody>
                                            {this.showContract(this.props.listContract)}
                                        </TableBody>

                                    </Table>
                                </div>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15, 20, 30]}
                                    component="div"
                                    count={this.props.paging.count}
                                    rowsPerPage={+this.props.paging.perpage}
                                    page={this.props.paging.page - 1}
                                    backIconButtonProps={{
                                        'aria-label': 'previous page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'next page',
                                    }}
                                    onChangePage={(event, newPage) => this.handleChangePage(event, newPage)}
                                    onChangeRowsPerPage={(event) => this.handleChangeRowsPerPage(event)}
                                />

                            </RctCollapsibleCard>
                        </div>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        listContract: state.contract.listContract,
        paging: state.contract.paging
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllContract: (filter) => dispatch(getAllContract(filter))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContract));
