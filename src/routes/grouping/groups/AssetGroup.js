import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class AssetGroup extends Component {
    render() {
        const { asset, index } = this.props;
        return (
            <TableRow hover>
            <TableCell>{index}</TableCell>
            <TableCell>{asset.title}</TableCell>
            <TableCell>{asset.type}</TableCell>
            <TableCell>{asset.alias}</TableCell>  
        </TableRow>
        );
    }
}

export default AssetGroup;