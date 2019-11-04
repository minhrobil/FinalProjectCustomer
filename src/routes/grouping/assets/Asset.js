import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { deleteAsset } from '../../../actions/AssetActions';
import FormEditAsset from './FormEditAsset';
class Asset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isEditAsset: false

        }
    }
    deleteAsset() {
        this.setState({
            ...this.state,
            open: true
        })
    }
    async onConfirm() {
        await this.props.deleteAsset({
            id: this.props.asset.id
        })
        this.setState({
            ...this.state,
            open: false

        })
    }
    onCancel() {
        this.setState({
            ...this.state,
            open: false

        })
    }
    showFormEditAsset() {
        this.setState({
            ...this.state,

            isEditAsset: true

        })
    }
    closeEditAssetModal = () => {
        this.setState({
            ...this.state,
            isEditAsset: false
        })
    }
    render() {
        const { asset, index } = this.props;
        return (
            <React.Fragment>
                <TableRow hover>
                    <TableCell style={{ width: "1%" }} align="left">{index}</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">
                    {/* {asset.title} */}
                    
                    <div className="row ml-50">
                    <div className="form-group">{asset.title}</div>
                    <div className="form-group ml-3 mt-3 ">
                    <button>Parent</button>
                    </div>
                    </div>
                    </TableCell>
                    <TableCell style={{ width: "25%" }}  align="center">{asset.type}</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">{asset.alias}</TableCell>

                    <TableCell align="center">

                        <IconButton aria-label="Edit" onClick={() => this.showFormEditAsset()} >
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={() => this.deleteAsset()} >
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <SweetAlert

                    btnSize="sm"
                    show={this.state.open}
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="success"
                    title="Are you sure?"
                    onConfirm={() => this.onConfirm()}
                    onCancel={() => this.onCancel()}
                >
                    You want to delete this asset ?
        		</SweetAlert>
                <Modal isOpen={this.state.isEditAsset} size="lg">
                    <ModalHeader toggle={() => this.closeEditAssetModal()}>
                        Edit Group
                    </ModalHeader>
                    <ModalBody>
                        <FormEditAsset asset={asset} close={() => this.closeEditAssetModal()}></FormEditAsset>
                    </ModalBody>

                </Modal>
            </React.Fragment>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteAsset: (data) => dispatch(deleteAsset(data))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Asset));