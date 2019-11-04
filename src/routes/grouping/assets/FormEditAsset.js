import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateAsset } from '../../../actions/AssetActions';
class FormEditAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.asset.id,
            title: this.props.asset.title,
            type: this.props.asset.type,
            alias: this.props.asset.alias
        }
    }
    onChangeData(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
    }
    closeEditAssetModal() {
        this.props.close()
    }
    Update = (event) => {

        event.preventDefault();
        // console.log(this.state);

        this.props.updateAsset({
            ...this.state
        }).then(res => {
            this.props.close();
        })
    }
    render() {
        // console.log('chekc',this.props);

        return (
            <form >
                <div className="row form-asset">
                    <div className="col-md-4">
                        <label>Title</label>
                        <input type="text" className="form-control " name="title"  value={this.state.title} onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-4">
                        <label>Type</label>
                        <input type="text" className="form-control " name="type"  value={this.state.type} onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-4">
                        <label>Alias</label>
                        <input type="text" className="form-control" name="alias"  value={this.state.alias} onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    
                    <div className="col-md-2">
                        <label>Parent_id</label>
                        <select name="parent_id" className="form-control" onChange={(event) => this.onChangeData(event)}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label>Icon</label>
                        <input type="text" className="form-control" name ="icon" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-6">
                        <label>Path</label>
                        <input type="text" className="form-control" name ="path" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group ml-auto mr-3 mt-4" >
                        <Button className="text-white btn-danger mr-2 " onClick={() => this.closeEditAssetModal()}>Cancel</Button>
                        <Button color="primary" className="text-white" type="submit" onClick={(event) => this.Update(event)} >Update</Button>
                    </div>
                </div>
            </form>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {


        updateAsset: (data) => dispatch(updateAsset(data))
    }
}
export default withRouter(connect(null, mapDispatchToProps)(FormEditAsset));
