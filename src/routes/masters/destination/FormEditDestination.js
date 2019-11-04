import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCategory } from '../../../actions/CategoryActions';
import { updateDestination } from '../../../actions/DestinationActions';
class FormEditDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.destination.id,
            title: this.props.destination.title,
            state: this.props.destination.state,
            alias: this.props.destination.alias,
            level: this.props.destination.level,
            intro: this.props.destination.intro,
        }
    }
    onChangeData(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        })
    }
    closeEditDestinationModal(){
        this.props.close()
    }
    Update = (event) => {

        event.preventDefault();
        // console.log(this.state);
        
        this.props.updateDestination({
            
            title: this.state.title,
           
           alias:this.state.alias,
           state: this.state.state,
           level: this.state.level,
           intro: this.state.intro,
           id: this.state.id
        }).then(res => {
            this.props.close();
        })
    }
    render() {
        return (
            <form >
             <div className="row form-destination">
                    <div className="col-md-6 ">
                        <label>Title</label>
                        
                        <input type="text" className="form-control" name="title" value={this.state.title} onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-6">
                        <label>State</label>
                        <input type="text" className="form-control" name="state"  value={this.state.state} onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-6">
                        <label>Alias</label>
                        <input type="text" className="form-control" name="alias"  value={this.state.alias} onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col-md-6">
                        <label>Level</label>
                        <input type="text" className="form-control" name="level"  value={this.state.level} onChange={(event) => this.onChangeData(event)}></input>
                    </div>
                    <div className="col">
                        <label>Intro</label>
                        <textarea type="text" className="form-control" name="intro"  value={this.state.intro} onChange={(event) => this.onChangeData(event)}></textarea>
                        
                    </div>

                </div>
            <div className="row">
                    <div className="form-group ml-auto mr-3 mt-4" >
                        <Button className="text-white btn-danger mr-2 " onClick={() => this.closeEditDestinationModal()}>Cancel</Button>
                        <Button color="primary" className="text-white" type="submit" onClick={(event) => this.Update(event)} >Update</Button>
                    </div>
                </div>
        </form>
        
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {

        
        updateDestination: (data) => dispatch(updateDestination(data))
    }
}
export default withRouter(connect(null, mapDispatchToProps)(FormEditDestination));