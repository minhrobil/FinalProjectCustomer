import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IntlMessages from 'Util/IntlMessages';
class Users extends Component {
    render() {
        return (
            <div className="formelements-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.users" />} match={this.props.match} />
                <div className="row">
                    <RctCollapsibleCard heading="List Customers" colClasses="col-12">
                        <Table stickyHeader>
                            <TableHead style={{ backgroundColor: "#5d92f4"}}>
                                <TableRow>
                                    <TableCell className="background-table-header">No.</TableCell>
                                    <TableCell className="background-table-header">Username</TableCell>
                                    <TableCell className="background-table-header">First Name</TableCell>
                                    <TableCell className="background-table-header">Last Name</TableCell>
                                    <TableCell className="background-table-header">Email</TableCell>
                                    <TableCell className="background-table-header">Permission</TableCell>
                                    <TableCell className="background-table-header">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow hover>
                                    <TableCell component="th" scope="row">
                                        1
                            </TableCell>
                                    <TableCell>TienServer</TableCell>
                                    <TableCell>Tien</TableCell>
                                    <TableCell>Do</TableCell>
                                    <TableCell>Peagoflash@gmail.com</TableCell>
                                    <TableCell>SuperAdmin</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="Delete" >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell component="th" scope="row">
                                        2
                            </TableCell>
                                    <TableCell>Tiennormal</TableCell>
                                    <TableCell>Tien'</TableCell>
                                    <TableCell>Do'</TableCell>
                                    <TableCell>Peago@gmail.com</TableCell>
                                    <TableCell>Normal</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="Delete" >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell component="th" scope="row">
                                        3
                            </TableCell>
                                    <TableCell>Tienadmin</TableCell>
                                    <TableCell>Tien''</TableCell>
                                    <TableCell>Do''</TableCell>
                                    <TableCell>Peagoadmin@gmail.com</TableCell>
                                    <TableCell>Admin</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="Delete" >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </RctCollapsibleCard>
                </div>
            </div>
        );
    }
}

export default Users;