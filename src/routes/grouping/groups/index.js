import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { getAllGroups } from '../../../actions/GroupActions';
import FormCreateGroup from './FormCreateGroup';
import Group from './Group';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreateGroup: false,
            listAsset: []
        }
    }
    openCreateGroupModal() {
        this.setState({
            ...this.state,
            isCreateGroup: true,
            //    listAsset: this.props.listAssets,
        })
    }
    closeCreateGroupModal() {
        this.setState({
            ...this.state,
            isCreateGroup: false
        })
    }

    componentDidMount() {

        this.props.getAllGroup()
        // this.props.getListAssets()
    }
    showGroup(listGroup) {
        if (listGroup.length) {
            return listGroup.map((item, index) => {
                return <Group key={item.id}
                    index={index + 1}
                    group={item}

                ></Group>
            })
        }
    }
    render() {
       


        return (

            <React.Fragment>
                <div className="formelements-wrapper">
                    <PageTitleBar title={<IntlMessages id="sidebar.groups" />} match={this.props.match} />
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-xl-12">
                            <RctCollapsibleCard heading="List Group">
                            <div className="mb-20">
                                <Button className="mr-10 mb-10" outline color="primary" onClick={() => this.openCreateGroupModal()}><span aria-hidden="true" className="icon-plus"></span> &nbsp;Add new Group</Button><br />
                            </div>
                            <div className="scroll-table">
                                <Table stickyHeader>
                                    <TableHead style={{ backgroundColor: "#5d92f4"}} >
                                        <TableRow>
                                            <TableCell className="background-table-header">No.</TableCell>
                                            <TableCell className="background-table-header">Title</TableCell>
                                            <TableCell className="background-table-header">Slug</TableCell>
                                            <TableCell className="background-table-header"> Created</TableCell>
                                            <TableCell className="background-table-header">Updated</TableCell>
                                            <TableCell className="background-table-header" align="center"> Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.showGroup(this.props.listGroup)}
                                    </TableBody>
                                </Table>
                            </div>
                </RctCollapsibleCard>
                    </div>
                </div>
                </div>
            <Modal isOpen={this.state.isCreateGroup} size="lg">
                <ModalHeader toggle={() => this.closeCreateGroupModal()}>
                    Infomation Group
               </ModalHeader>
                <ModalBody>
                    <FormCreateGroup close={() => this.closeCreateGroupModal()}></FormCreateGroup>
                </ModalBody>

            </Modal>
            </React.Fragment >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listGroup: state.group.listGroup,
        // listAssets: state.group.listAssets


    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGroup: () => dispatch(getAllGroups()),
        // getListAssets: ()=>dispatch(getListAssets())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));