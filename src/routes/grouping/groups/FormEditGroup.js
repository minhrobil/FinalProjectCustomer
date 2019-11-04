import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { getListAssets, updateGroup } from '../../../actions/GroupActions';
class FormEditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAssetAGroup: this.props.group.assets,
            assetid: [],
            title: this.props.group.title,
            id: this.props.group.id,
            listAssets: this.props.listAssets
        }
    }
    async componentDidMount() {
        this.props.getListAssets();
        let asset_id = [];
        await this.state.listAssetAGroup.map(e => {
            return (
                asset_id.push(e.id)
            )
        })
        this.setState({
            assetid: asset_id
        })
    }
    onChangeData(event) {
        
        
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
    }

    checkAsset(arrAsset, asset) {
        for (let i = 0; i < arrAsset.length; i++) {
            if (arrAsset[i] === asset.id) return true;
        }
        return false;
    }
    handleChange(id, isCheck) {
        const { assetid } = this.state;

        if (isCheck) {
            var new_assetid = assetid.filter(item => item !== id)
            this.setState({
                ...this.state,
                assetid: new_assetid
            })
        }
        else {
            assetid.push(id)
            this.setState({
                ...this.state,
                assetid: assetid
            })
        }


    }
    closeEditGroupModal() {
        this.props.close()
    }
    Update = (event) => {

        event.preventDefault();
     
        this.props.updateGroup({
            id: this.state.id,
            title: this.state.title,
            assetid: this.state.assetid
        }).then(res => {
            this.props.close();
        }).catch(err => console.log(err));
    }
    render() {

        const { listAssets } = this.props;

        


        return (
            <form >
                <div className="row form-group">
                    <div className="col" >
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" value={this.state.title} onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-6">
                        <label>Asset</label>
                        <FormControl>
                            <FormGroup>
                                {listAssets.map((item, index) => {
                                    let isCheck = this.checkAsset(this.state.assetid, item);
                                    return <FormControlLabel key={item.id}
                                        control={<Checkbox checked={this.checkAsset(this.state.assetid, item)} onClick={() => this.handleChange(item.id, isCheck)} />}
                                        label={item.title}
                                    />
                                })

                                }
                            </FormGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group ml-auto mr-3" >
                        <Button className="text-white btn-danger mr-2 " onClick={() => this.closeEditGroupModal()}>Cancel</Button>
                        <Button color="primary" className="text-white" type="submit" onClick={(event) => this.Update(event)} >Update</Button>
                    </div>
                </div>

            </form>
        );
    }
}
const mapStateToProps = (state) => {
    return {

        listAssets: state.group.listAssets


    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        getListAssets: () => dispatch(getListAssets()),
        updateGroup: (data) => dispatch(updateGroup(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormEditGroup));