import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import FormViewDestination from './FormViewDestination';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteDestination } from '../../../actions/DestinationActions';
import FormEditDestination from './FormEditDestination';
class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isViewDestination: false,

            isEditDestination: false,
            open: false


        }
    }
    onCancel() {
        this.setState({
            ...this.state,
            open: false

        })
    }
    async onConfirm() {
        await this.props.deleteDestination({
            id: this.props.destination.id
        })
        this.setState({
            ...this.state,
            open: false

        })
    }
    deleteDestination() {
        this.setState({
            ...this.state,
            open: true

        })
    }
    showFormViewDestination() {
        this.setState({
            ...this.state,
            isViewDestination: true
        })
    }
    closeViewDestinationModal() {
        this.setState({
            ...this.state,
            isViewDestination: false
        })
    }
    closeEditDestinationModal() {
        this.setState({
            ...this.state,
            isEditDestination: false
        })
    }
    showFormEditDestination() {
        this.setState({
            ...this.state,
            isEditDestination: true
        })
    }
    render() {
        const { destination, index } = this.props;
        return (
            <React.Fragment>
                <TableRow hover>
                    <TableCell  >{index}</TableCell>
                    <TableCell  style={{minWidth:'430px'}}>{destination.title}</TableCell>
                    <TableCell>{destination.access}</TableCell>
                    <TableCell>{destination.parent_id}</TableCell>

                    <TableCell>{destination.value}</TableCell>

                    <TableCell>{destination.country_id}</TableCell>
                    <TableCell style={{minWidth:'200px'}}>{destination.alias}</TableCell>
                    <TableCell>{destination.ordering}</TableCell>
                    <TableCell>{destination.code}</TableCell>
                    <TableCell>{destination.state}</TableCell>

                    {/* <TableCell>{destination.state_id}</TableCell> */}
                    {/* <TableCell>{destination.content}</TableCell> */}

                    <TableCell>{destination.level}</TableCell>
                    {/* <TableCell>{destination.image}</TableCell> */}


                    {/* <TableCell>{new Date(destination.created_at).toLocaleString()}</TableCell>
            <TableCell>{new Date(destination.updated_at).toLocaleString()}</TableCell> */}
                    <TableCell align="center">
                        <p style={{ display: "inline-flex" }}>
                            <IconButton aria-label="View" onClick={() => this.showFormViewDestination()}>
                                <ViewIcon />
                            </IconButton>
                            <IconButton aria-label="Edit" onClick={() => this.showFormEditDestination()}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="Delete" onClick={() => this.deleteDestination()} >
                                <DeleteIcon />
                            </IconButton>
                        </p>
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
                    You want to delete this destination ?
               </SweetAlert>
                <Modal isOpen={this.state.isViewDestination} size="lg" key='modalview'>
                    <ModalHeader toggle={() => this.closeViewDestinationModal()}>

                    </ModalHeader>
                    <ModalBody>
                        <FormViewDestination destination={destination}></FormViewDestination>
                    </ModalBody>

                </Modal>
                <Modal isOpen={this.state.isEditDestination} size="lg" key='modaleidt'>
                    <ModalHeader toggle={() => this.closeEditDestinationModal()}>
                        Edit Destination
                    </ModalHeader>
                    <ModalBody>
                        <FormEditDestination destination={destination} close={() => this.closeEditDestinationModal()}></FormEditDestination>

                    </ModalBody>

                </Modal>

            </React.Fragment>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteDestination: (data) => dispatch(deleteDestination(data))
    }
}


export default withRouter(connect(null, mapDispatchToProps)(Destination));