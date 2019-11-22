import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { getAllAsset } from '../../../actions/AssetActions';
import Asset from './Asset';
import FormCreateAsset from './FormCreateAsset';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
class Assets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter:{
                parent_id : {
                    type: "=",
                    value: 0
                }
            },
            isCreateAsset: false,

        }
    }
    openCreateAssetModal() {
        this.setState({
            ...this.state,
            isCreateAsset: true,

        })
    }
    closeCreateAssetModal() {
        this.setState({
            ...this.state,
            isCreateAsset: false
        })
    }

    componentDidMount() {

        this.props.getListAssets(this.state.filter)
       
        
    }
    showAsset(listAssets) {
        if (listAssets.length) {
            return listAssets.map((item, index) => {
                return <Asset key={item.id}
                    index={index + 1}
                    asset={item}

                ></Asset>
            })
        }
    }
    render() {
        return (

            <React.Fragment>
                <div className="formelements-wrapper">
                    <PageTitleBar title={<IntlMessages id="sidebar.assets" />} match={this.props.match} />
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-xl-12">
                            <RctCollapsibleCard heading="List Asset">
                                <div className="mb-20">
                                    <Button className="mr-10 mb-10" outline color="primary" onClick={() => this.openCreateAssetModal()}><span aria-hidden="true" className="icon-plus"></span> &nbsp;Add new Asset</Button><br />
                                </div>
                                <div className="scroll-table">
                                    <Table stickyHeader>
                                        <TableHead >
                                            <TableRow>
                                                <TableCell className="background-table-header" align="left">No.</TableCell>
                                                <TableCell className="background-table-header"  align="center">Title</TableCell>
                                                <TableCell className="background-table-header"  align="center">Type</TableCell>
                                                <TableCell className="background-table-header"  align="center">Alias</TableCell>
                                                <TableCell className="background-table-header"  align="center">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.showAsset(this.props.listAssets)}
                                        </TableBody>
                                    </Table>

                                </div>
                            </RctCollapsibleCard>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isCreateAsset} size="lg">
                    <ModalHeader toggle={() => this.closeCreateAssetModal()}>
                        Infomation Asset
               </ModalHeader>
                    <ModalBody>
                        <FormCreateAsset close={() => this.closeCreateAssetModal()} ></FormCreateAsset>
                    </ModalBody>

                </Modal>
            </React.Fragment >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listAssets: state.asset.listAssets


    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListAssets: (filter) => dispatch(getAllAsset(filter))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Assets));