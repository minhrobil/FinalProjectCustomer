import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
class FormViewDestination extends Component {
    render() {

        const { destination } = this.props;
        return (
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell>Intro</TableCell>
                        <TableCell>Longitude</TableCell>
                        <TableCell>Latitude</TableCell>
                        <TableCell >Metakey</TableCell>
                        <TableCell >Metadesc</TableCell>




                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{destination.intro}</TableCell>
                        <TableCell>{destination.longitude}</TableCell>
                        <TableCell>{destination.latitude}</TableCell>
                        <TableCell>{destination.metakey}</TableCell>
                        <TableCell>{destination.metadesc}</TableCell>




                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default FormViewDestination;