import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import { createADestination, create, createDestination } from '../../../actions/DestinationActions';


class FormCreateDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            alias: '',
            state:'',
            level: '',
            intro:'',
        }
    }
    onChangeData(event) {
        this.setState({
         ...this.state,
         [event.target.name]: event.target.value,
        })
    }
    addNewDestination(event){
        event.preventDefault();
       
        
        this.props.add({
            title: this.state.title,
            alias:this.state.alias,
            state: this.state.state,
            level:this.state.level,
            intro:this.state.intro
        }).then(res => {

            this.props.close();
            NotificationManager.success('add destination success');
        })
    }
    render() {
        
        
        return (
            <form onSubmit={(event) => this.addNewDestination(event)}>
                <div className="row form-destination">
                    <div className="col-md-6 ">
                        <label>Title</label>
                        
                        <input type="text" className="form-control" name="title" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-6">
                        <label>State</label>
                        <input type="text" className="form-control" name="state" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-6">
                        <label>Alias</label>
                        <input type="text" className="form-control" name="alias" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-6">
                        <label>Level</label>
                        <input type="text" className="form-control" name="level" onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col">
                        <label>Intro</label>
                        <textarea type="text" className="form-control" name="intro" onChange={(event) => this.onChangeData(event)}>intro...</textarea>
                        
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

const mapDispatchToProps = (dispatch) => {
    return {
        add: (data) => dispatch(createDestination(data)),
       
    }
}

export default withRouter(connect(null,mapDispatchToProps )(FormCreateDestination));