import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { addAsset, getAllAsset } from '../../../actions/AssetActions';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
class FormCreateAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                parent_id: {
                    type: "=",
                    value: 0
                }
            },
            title: '',
            type: '',
            alias: '',
            icon: '',
            parent_id: 0,
            path: '',
        }
    }
    componentDidMount() {

        this.props.getListParentAssets(this.state.filter)


    }
    onChangeData(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        }
        
        )
    }
    addNewAsset(event) {
        event.preventDefault();


        this.props.addAsset({
            title: this.state.title,
            type: this.state.type,
            alias: this.state.alias,
            icon:this.state.icon,
            path:this.state.path,
            parent_id:this.state.parent_id
        }).then(res => {

            this.props.close();
            NotificationManager.success('add asset success');
        })
    }
    render() {
        const { listParentAssets } = this.props;
        // console.log(listParentAssets);

        return (
            <form onSubmit={(event) => this.addNewAsset(event)}>
                <div className="row form-asset">
                    <div className="col-md-4">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-4">
                        <label>Type</label>
                        <input type="text" className="form-control" name="type" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-4">
                        <label>Alias</label>
                        <input type="text" className="form-control" name="alias" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-2">
                        <label>Parent</label>
                        <FormControl >
                        <FormGroup>
                        <InputLabel >Select</InputLabel>
                            <Select  
                            value={this.state.parent_id}
                            name = 'parent_id'
                                onChange={(event) => this.onChangeData(event)} 
                            >{listParentAssets.map((item,index)=>{
                                return  <MenuItem 
                                key={item.id} 
                                value={item.id}>{item.title}</MenuItem>
                            })}
                            </Select>
                            
                            
                            </FormGroup>
                        </FormControl>
                    </div>
                    <div className="col-md-4">
                        <label>Icon</label>
                        <input type="text" className="form-control" name="icon" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-6">
                        <label>Path</label>
                        <input type="text" className="form-control" name="path" onChange={(event) => this.onChangeData(event)}></input>
                    </div>


                </div>
                <div className="row">
                    <div className="form-group ml-auto mr-3 mt-20" >
                        <Button color="primary" type="type">Add</Button>
                    </div>
                </div>
            </form>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listParentAssets: state.asset.listAssets


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addAsset: (data) => dispatch(addAsset(data)),
        getListParentAssets: (filter) => dispatch(getAllAsset(filter))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormCreateAsset));