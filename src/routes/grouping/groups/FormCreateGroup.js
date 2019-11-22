import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { createAGroup, getListAssets } from '../../../actions/GroupActions';
class FormCreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug:'',
            title: '',
            assetid: [],
        }
    }
    onChangeData(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
    }
    handleChange(event) {
        this.setState({
            ...this.state,
            assetid: [...this.state.assetid, event]
        })
    }
     addNewGroup(event) {
        event.preventDefault();
        this.props.createAGroup({
            title: this.state.title,
            assetid: this.state.assetid,
            slug:this.state.slug
        }).then(res => {

            this.props.close();
            NotificationManager.success('add group success');
        })


    }
    componentDidMount() {
        this.props.getListAssets();
    }
    render() {
        const listAsset = this.props.listAssets;



        return (
            <form onSubmit={(event) => this.addNewGroup(event)}>
                <div className="row form-group">
                    <div className="col" >
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col" >
                        <label>Slug</label>
                        <input type="text" className="form-control" name="slug" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-6">
                        <label>Asset</label>
                        <FormControl>
                            <FormGroup>
                                {listAsset.map((item, index) => {
                                    return <FormControlLabel key={item.id}
                                        control={<Checkbox onChange={() => this.handleChange(item.id)} />}
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
                        <Button type="submit" color="primary" >Save</Button>
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
        createAGroup: (data) => dispatch(createAGroup(data)),
        getListAssets: () => dispatch(getListAssets())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormCreateGroup));