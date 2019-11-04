import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import AssetGroup from './AssetGroup';
class FormViewGroupAsset extends Component {
    showAsset(listAsset) {
        if (listAsset.length) {
            return listAsset.map((item, index) => {
                return <AssetGroup key={item.id}
                    index={index + 1}
                    asset={item}
                ></AssetGroup>
            })
        }
    }
    render() {  
        
        return (
            <div>
                <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Alias</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.showAsset(this.props.listAsset)}
                        </TableBody>
                    </Table> 
            </div>
        );
    }
}


export default FormViewGroupAsset;