import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Contract extends Component {
    render() {
        const { contract, index } = this.props;
        return (
            <React.Fragment>
                <TableRow hover>
                    <TableCell>{index}</TableCell>
                    <TableCell>{contract.contact_name}</TableCell>
                    <TableCell>{contract.hotel_id}</TableCell>
                    {/* <TableCell>{contract.start}</TableCell> */}
                    <TableCell>{new Date(contract.start).toLocaleString()}</TableCell>
                    <TableCell>{contract.contact_email}</TableCell>
                    <TableCell>{contract.contact_phone}</TableCell>
                    <TableCell>{contract.contact_address}</TableCell>
                    <TableCell>{contract.rank}</TableCell>
                    <TableCell>{contract.name}</TableCell>
                    <TableCell>{contract.city_id}</TableCell>
                    <TableCell>{contract.region_id}</TableCell>
                    <TableCell>{contract.checkin}</TableCell>
                    <TableCell>{contract.checkout}</TableCell>
                    <TableCell>{contract.address}</TableCell>
                    <TableCell>{contract.latitude}</TableCell>
                    <TableCell>{contract.longitude}</TableCell>
                    <TableCell>{contract.notes_client.substr(0, 50)}</TableCell>
                    {/* <TableCell>{contract.notes}</TableCell>
                    <TableCell>{contract.commission}</TableCell>
                    <TableCell>{contract.end}</TableCell>
                    <TableCell>{contract.sale_id}</TableCell>
                    <TableCell>{contract.amount}</TableCell>
                    <TableCell>{contract.filepath}</TableCell>
                    <TableCell>{contract.state}</TableCell>
                    <TableCell>{contract.params}</TableCell>
                    <TableCell>{contract.created}</TableCell>
                    <TableCell>{contract.hoteltype_id}</TableCell>
                    <TableCell>{contract.avatar}</TableCell>
                    <TableCell>{contract.allow_book_online}</TableCell>
                    <TableCell>{contract.allow_book_weekend}</TableCell>
                    <TableCell>{contract.allow_book_start}</TableCell>
                    <TableCell>{contract.allow_book_end}</TableCell> */}


                    <TableCell>{new Date(contract.created_at).toLocaleString()}</TableCell>
                    <TableCell>{new Date(contract.updated_at).toLocaleString()}</TableCell>

                </TableRow>


            </React.Fragment>
        );
    }
}

export default Contract;