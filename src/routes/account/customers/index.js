// import React, { Component } from 'react';
import React, { Component } from 'react';
// import AppBar from '../_components/appbar';
// import Typography from '@material-ui/core/Typography';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// import "../../../../public/master.css";

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box

import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// import Nav from '../_components/nav';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { Button } from 'reactstrap';
import MatButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import moment from 'moment';
// import { DatePicker } from 'material-ui-pickers';
// import  KeyboardDatePicker from '@material-ui/pickers';
import SweetAlert from 'react-bootstrap-sweetalert';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllCustomer } from '../../../actions/CustomerActions';
import Customer from './Customer';
import FormCreateCustomer from './FormCreateCustomer';
import ExtraLargeModal from '../../../components/ExtraLargeModal/ExtraLargeModal';


class ListCustomers extends Component {

   constructor(props) {
      super(props);
      this.state = {
         filter: {
            sort: {
               type: "desc",
               attr: ""
            },
            created_at: {
               type: "compare",
               value: {
                  from: "",
                  to: ""
               }
            },
            email: {
               type: "like",
               value: ""
            },
            username: {
               type: "like",
               value: ""
            },
            rank: {
               type: "",
               value: []
            },
            search: "",
            paging: {
               perpage: 10,
               page: 1
            }
         },
         isCreateCustomer: false,
         isDelete: false
      }

   }

   componentDidMount() {
      this.props.getAllCustomers(this.state.filter).then(res => {
         NotificationManager.success(res.msg);
      })
   }

   showCustomer(listCustomer) {
      if (listCustomer.length) {
         return listCustomer.map((item, index) => {
            return <Customer key={item.id}
               index={(this.state.filter.paging.page - 1) * this.state.filter.paging.perpage + index + 1}
               customer={item}
            ></Customer>
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
         this.props.getAllCustomers(this.state.filter);
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
         this.props.getAllCustomers(this.state.filter);
      });
   }


   closeCreateCustomerModal() {
      this.setState({
         ...this.state,
         isCreateCustomer: false
      })
   }

   openCreateCustomerModal() {
      this.setState({
         ...this.setState,
         isCreateCustomer: true
      })
   }

   onResetFilter() {
      this.setState({
         ...this.state,
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
            email: {
               type: "like",
               value: ""
            },
            username: {
               type: "like",
               value: ""
            },
            rank: {
               type: "",
               value: []
            },
            search: "",
            paging: {
               perpage: 10,
               page: 1
            }
         },
      }, () => this.props.getAllCustomers(this.state.filter))
   }

   onChangeSearch(event) {
      this.setState({
         ...this.state,
         filter: {
            ...this.state.filter,
            search: event.target.value
         }
      }, () => this.props.getAllCustomers(this.state.filter))
   }

   onChangeUsername(event) {
      this.setState({
         ...this.state,
         filter: {
            ...this.state.filter,
            username: {
               type: "like",
               value: event.target.value
            }
         }
      }, () => this.props.getAllCustomers(this.state.filter))
   }


   onChangeEmail(event) {
      this.setState({
         ...this.state,
         filter: {
            ...this.state.filter,
            email: {
               type: "like",
               value: event.target.value
            }
         }
      }, () => this.props.getAllCustomers(this.state.filter))
   }

   handleChangeSortType(event) {
      this.setState({
         ...this.state,
         filter: {
            ...this.state.filter,
            sort: {
               ...this.state.filter.sort,
               type: event.target.value
            }
         }
      }, () => this.props.getAllCustomers(this.state.filter));
   }

   handleChangeSortAttr(event) {
      this.setState({
         ...this.state,
         filter: {
            ...this.state.filter,
            sort: {
               ...this.state.filter.sort,
               attr: event.target.value
            }
         }
      }, () => this.props.getAllCustomers(this.state.filter));
   }

   handleChangeRank(event, name) {
      this.setState({
         ...this.state,
         filter: {
            ...this.state.filter,
            rank: {
               ...this.state.filter.rank,

            }
         }
      })
   }





   render() {
      return (
         <React.Fragment>
            <div className="formelements-wrapper">
               <PageTitleBar title={<IntlMessages id="sidebar.customers" />} match={this.props.match} />
               <div className="row">
                  <div className="col-sm-12 col-md-12 col-xl-12">
                     <RctCollapsibleCard heading="List Customers">
                        <div className="mb-20">
                           <Button className="mr-10 mb-10" outline color="primary" onClick={() => this.openCreateCustomerModal()}><span aria-hidden="true" className="icon-plus"></span> &nbsp;Add new Customer</Button><br />
                           <div>
                              <span>FILTERS</span>
                              <MatButton className="text-primary mr-10 mb-10" style={{ marginTop: "8px", marginLeft: "20px", fontSize: "inherit" }} onClick={() => this.onResetFilter()} >RESET</MatButton>
                           </div>
                           <div className="row">
                              <div className="col-sm-6 col-md-6 col-xl-3">
                                 <div className="form-group">
                                    <TextField id="search" fullWidth label="Search" value={this.state.filter.search} onChange={(event) => this.onChangeSearch(event)} />
                                 </div>
                              </div>

                              {/* <div className="col-sm-6 col-md-6 col-xl-3">
                                 <div className="form-group">
                                    <TextField id="username" fullWidth label="Username" value={this.state.filter.username.value} onChange={(event) => this.onChangeUsername(event)} />
                                 </div>

                              </div>
                              <div className="col-sm-6 col-md-6 col-xl-3">
                                 <div className="form-group">
                                    <TextField id="email" fullWidth label="Email" onChange={(event) => this.onChangeEmail(event)} />
                                 </div>

                              </div> */}
                           </div>
                           <div className="row">
                              <div className="col-sm-12 col-md-12 col-xl-4">
                                 <div className="form-group">
                                    <label>Sort</label>
                                    <div className="row">
                                       <div className="col-sm-6 col-md-6 col-xl-6">
                                          <FormControl fullWidth>
                                             <InputLabel htmlFor="sort-type">Type</InputLabel>
                                             <Select value={this.state.filter.sort.type} onChange={(event) => this.handleChangeSortType(event)}
                                                inputProps={{ name: 'type', id: 'sort-type', }}>
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="asc">ASC</MenuItem>
                                                <MenuItem value="desc">DESC</MenuItem>
                                             </Select>
                                          </FormControl>
                                       </div>
                                       <div className="col-sm-6 col-md-6 col-xl-6">
                                          <FormControl fullWidth>
                                             <InputLabel htmlFor="sort-attr">Attribute</InputLabel>
                                             <Select value={this.state.filter.sort.attr} onChange={(event) => this.handleChangeSortAttr(event)}
                                                inputProps={{ name: 'attr', id: 'sort-attr', }}>
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="username">username</MenuItem>
                                                <MenuItem value="firstname">firstname</MenuItem>
                                                <MenuItem value="lastname">lastname</MenuItem>
                                                <MenuItem value="address">address</MenuItem>
                                                <MenuItem value="country_id">country_id</MenuItem>
                                                <MenuItem value="birthday">birthday</MenuItem>
                                                <MenuItem value="company">company</MenuItem>
                                                <MenuItem value="rank">rank</MenuItem>
                                                <MenuItem value="created_at">created</MenuItem>
                                                <MenuItem value="updated_at">updated</MenuItem>
                                             </Select>
                                          </FormControl>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                        </div>
                        {/* <div className="col-sm-6 col-md-6 col-xl-4">
                                 <div className="form-group">
                                    <label>Created</label>
                                    <div className="row">
                                       <div className="col-sm-6 col-md-6 col-xl-6">
                                          <DatePicker
                                             label="From"
                                             // value={selectedDate}
                                             onChange={this.handleDateChange}
                                             animateYearScrolling={false}
                                             leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                             rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                             fullWidth
                                          /> 
                                          <KeyboardDatePicker
                                             label="From"
                                             margin="normal"
                                             id="date-picker-dialog"
                                             
                                             format="MM/dd/yyyy"
                                             
                                             onChange={this.handleDateChange}
                                             KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                             }}
                                          />
                                       </div>
                                       <div className="col-sm-6 col-md-6 col-xl-6">
                                           <DatePicker
                                             label="To"
                                             // value={selectedDate}
                                             onChange={this.handleDateChange}
                                             animateYearScrolling={false}
                                             leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                             rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                             fullWidth
                                          />
                                           <KeyboardDatePicker
                                             margin="normal"
                                             id="date-picker-dialog"
                                             label="To"
                                             format="MM/dd/yyyy"
                                             
                                             onChange={this.handleDateChange}
                                             KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                             }}
                                          />
                                       </div>
                                    </div>
                                 </div>

                              </div>
                              <div className="col-sm-6 col-md-6 col-xl-4">
                                 <div className="form-group">
                                    <label>Rank</label>
                                    <div className="row">
                                       <div className="col-sm-6 col-md-6 col-xl-6">
                                          <TextField id="rank-from" fullWidth label="From" />
                                       </div>
                                       <div className="col-sm-6 col-md-6 col-xl-6">
                                          <TextField id="rank-to" fullWidth label="To" />
                                       </div>
                                    </div>
                                 </div>

                              </div>
                           </div>
                        </div> */}
                        <div  className="scroll-table">
                           <Table stickyHeader>
                              <TableHead className="background-table-header">
                                 <TableRow>
                                    <TableCell scope="col" className="background-table-header" size="small" >No.</TableCell>
                                    <TableCell scope="col" className="background-table-header">Username</TableCell>
                                    <TableCell scope="col" className="background-table-header">First Name</TableCell>
                                    <TableCell scope="col" className="background-table-header">Last Name</TableCell>
                                    <TableCell scope="col" className="background-table-header">Email</TableCell>
                                    <TableCell scope="col" className="background-table-header">Country Id</TableCell>
                                    <TableCell scope="col" className="background-table-header">Phone Code</TableCell>
                                    <TableCell scope="col" className="background-table-header">Telephone</TableCell>
                                    <TableCell scope="col" className="background-table-header">Mobile</TableCell>
                                    <TableCell scope="col" className="background-table-header">Address</TableCell>
                                    <TableCell scope="col" className="background-table-header"> City</TableCell>
                                    <TableCell scope="col" className="background-table-header">State</TableCell>
                                    <TableCell scope="col" className="background-table-header">Zip</TableCell>
                                    <TableCell scope="col" className="background-table-header">Lang</TableCell>
                                    <TableCell scope="col" className="background-table-header">Rank</TableCell>
                                    <TableCell scope="col" className="background-table-header">Credit</TableCell>
                                    <TableCell scope="col" className="background-table-header" >Currency</TableCell>
                                    <TableCell scope="col" className="background-table-header">Birthday</TableCell>
                                    <TableCell scope="col" className="background-table-header">Gender</TableCell>
                                    <TableCell scope="col" className="background-table-header">Company</TableCell>
                                    {/* <TableCell scope="col">Cardholder</TableCell>
                                    <TableCell scope="col">Referral id</TableCell>
                                    <TableCell scope="col">Group Id</TableCell>
                                    <TableCell scope="col">Image</TableCell> */}
                                    <TableCell scope="col" className="background-table-header">Created</TableCell>
                                    <TableCell scope="col" className="background-table-header">Updateed</TableCell>
                                    <TableCell scope="col" className="background-table-header">Action</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {this.showCustomer(this.props.listCustomer)}
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

            <Modal isOpen={this.state.isCreateCustomer} size="lg">
               <ModalHeader toggle={() => this.closeCreateCustomerModal()}>
                  <span style={{ fontSize: "2em" }}>Create Customer</span>
               </ModalHeader>
               <ModalBody>
                  <FormCreateCustomer closeForm={() => this.closeCreateCustomerModal()}></FormCreateCustomer>
               </ModalBody>
               <ModalFooter>
               </ModalFooter>
            </Modal>

            {/* <ExtraLargeModal isOpen={this.state.isCreateCustomer} toggle={() => this.closeCreateCustomerModal()}>
               aaaaaaaaa
            </ExtraLargeModal> */}

            {/* <SweetAlert
               btnSize="sm"
               show={this.state.isDelete}
               showCancel
               confirmBtnText="Yes, delete it!"
               confirmBtnBsStyle="danger"
               cancelBtnBsStyle="success"
               title="Are you sure?"
               onConfirm={() => this.onConfirmDelete()}
               onCancel={() => this.onCancel()}
            >
               You want to delete this customer?
            </SweetAlert> */}
         </React.Fragment>
      );
   }
}

function mapStateToProps(state) {
   return {
      listCustomer: state.customer.listCustomer,
      paging: state.customer.paging
   }
}

function mapDispatchToProps(dispatch) {
   return {
      getAllCustomers: (filter) => dispatch(getAllCustomer(filter))
   }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListCustomers));
