import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';
import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteGroup } from '../../../actions/GroupActions';
import FormEditGroup from './FormEditGroup';
import FormViewGroupAsset from './FormViewGroupAsset';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isViewGroup: false,
            listAsset: [],
            listGroup: this.props.listGroup,
            idGroup: null,
            isDialog: false,
            isEditGroup: false,
            open: false,


        }
    }
    closeViewGroupModal() {
        this.setState({
            ...this.state,
            isViewGroup: false
        })
    }
    closeEditGroupModal = () =>{
        this.setState({
            ...this.state,
            isEditGroup: false
        })
    }
    getAssset = (asset) => {


        this.setState({
            ...this.state,
            isViewGroup: true,
            listAsset: asset,
        })
    }
    // deleteGroup = (idGroup) => {
    //     this.props.deleteGroup({
    //         id: idGroup
    //     }).then(res => {
    //          window.location.reload();


    //     })

    // }
    // deleteGroup = (idGroup) => {
    //     this.setState({
    //         ...this.state,
    //         open: true

    //     })
    // }
    // async onConfirm() {
    //     await this.props.deleteGroup({
    //         id: this.props.group.id
    //     })
    //     this.setState({
    //         ...this.state,
    //         open: false

    //     })
    // }
    // onCancel() {
    //     this.setState({
    //         ...this.state,
    //         open: false

    //     })
    // }
    showFormEditGroup() {
        this.setState({
            ...this.state,

            isEditGroup: true

        })
    }
    handleClose() {
        this.setState({
            ...this.state,
            isDialog: false,

        })
    }

    openDialog() {
        this.setState({
            ...this.state,
            isDialog: true,

        })
    }
    render() {

        const { group, index } = this.props;


        return (
            <React.Fragment>
                <TableRow hover>
                    <TableCell>{index}</TableCell>
                    <TableCell>{group.title}</TableCell>
                    <TableCell>{group.slug}</TableCell>
                    <TableCell>{new Date(group.created_at).toLocaleString()}</TableCell>
                    <TableCell>{new Date (group.updated_at).toLocaleString()}</TableCell>

                    <TableCell align="center">
                        <IconButton aria-label="View" onClick={() => this.getAssset(group.assets)}>
                            <ViewIcon />
                        </IconButton>
                        <IconButton aria-label="Edit" onClick={() => this.showFormEditGroup()}>
                            <EditIcon />
                        </IconButton>
                        {/* <IconButton aria-label="Delete" onClick={() => this.deleteGroup(group.id)}>
                            <DeleteIcon />
                        </IconButton> */}
                    </TableCell>
                </TableRow>
                {/* <SweetAlert
                    //    warning
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
                    You want to delete this group ?
        		</SweetAlert> */}
                <Modal isOpen={this.state.isViewGroup} size="lg"key ='modalview'>
                    <ModalHeader toggle={() => this.closeViewGroupModal()}>
                        List Asset of Group
                    </ModalHeader>
                    <ModalBody>
                        <FormViewGroupAsset listAsset={this.state.listAsset}></FormViewGroupAsset>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isEditGroup} size="lg"key='modaleidt'>
                    <ModalHeader toggle={() => this.closeEditGroupModal()}>
                        Edit Group
                    </ModalHeader>
                    <ModalBody>
                        <FormEditGroup group={group} close={this.closeEditGroupModal}></FormEditGroup>
                    </ModalBody>

                </Modal>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listGroup: state.group.listGroup,
    }
}
// function mapDispatchToProps(dispatch) {
//     return {
//         deleteGroup: (data) => dispatch(deleteGroup(data)),

//     }
// }
export default withRouter(connect(mapStateToProps, null)(Group));