import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

class Customer extends Component {

    render() {
        const { customer, index } = this.props;
        return (
            <TableRow hover>
                <TableCell scope="row" size="small">{index}</TableCell>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{customer.firstname}</TableCell>
                <TableCell>{customer.lastname}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.country_id}</TableCell>
                <TableCell>{customer.phone_code}</TableCell>
                <TableCell>{customer.telephone}</TableCell>
                <TableCell>{customer.mobile}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell>{customer.states}</TableCell>
                <TableCell>{customer.zip}</TableCell>
                <TableCell>{customer.lang}</TableCell>
                <TableCell>{customer.rank}</TableCell>
                <TableCell>{customer.credit}</TableCell>
                <TableCell>{customer.currency}</TableCell>
                <TableCell>{new Date(customer.birthday).toLocaleDateString()}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                <TableCell>{customer.company}</TableCell>
                {/* <TableCell>{customer.cardholder}</TableCell>
                <TableCell>{customer.referral_id}</TableCell>
                <TableCell>{customer.group_id}</TableCell>
                <TableCell>{customer.image}</TableCell> */}
                <TableCell>{new Date(customer.created_at).toLocaleString()}</TableCell>
                <TableCell>{new Date(customer.updated_at).toLocaleString()}</TableCell>
                <TableCell>
                    <p style={{ display: "inline-flex" }}>
                        <IconButton aria-label="Edit">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete" >
                            <DeleteIcon />
                        </IconButton>
                    </p>
                </TableCell>
            </TableRow>
        )
    }
}

export default Customer;