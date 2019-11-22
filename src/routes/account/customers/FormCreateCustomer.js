import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createACustomer } from '../../../actions/CustomerActions';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { getAllGroups } from '../../../actions/GroupActions';
class FormCreateCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            newCustomer: {
                firstname: "",
                lastname: "",
                address: "",
                mobile: "",
                email: "",
                birthday: "",
                company: "",
                gender: "M",
                city: "",
                groupid: []
            }
        }
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            newCustomer:{
                ...this.state.newCustomer,
                groupid: [...this.state.newCustomer.groupid, event]
            }
        })
    }
    onSetCustomer(e) {
        this.setState({
            ...this.state,
            newCustomer: {
                ...this.state.newCustomer,
                [e.target.name]: e.target.value
            }
        })
    }

    async createNewCustomer(e) {
       
        
        e.preventDefault();
        await this.setState({
            ...this.state,
            isSubmit: true
        });
        await this.props.createACustomer(this.state.newCustomer);
        this.setState({
            ...this.state,
            isSubmit: false
        }, () => this.props.closeForm())
    }

    componentDidMount() {
        this.props.getListGroup();
    }

    render() {
        const listGroup = this.props.listGroup;
        return (

            <form onSubmit={e => this.createNewCustomer(e)}>
                <div className="row form-group">
                    <div className="col-md-4 form-group">
                        <label>Firstname</label>
                        <input type="text" className="form-control" name="firstname" required value={this.state.firstname} onChange={(e) => this.onSetCustomer(e)}></input>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Lastname</label>
                        <input type="text" className="form-control" name="lastname" required value={this.state.lastname} onChange={(e) => this.onSetCustomer(e)}></input>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Gender</label>
                        <select name="gender" className="form-control" required value={this.state.gender} onChange={(e) => this.onSetCustomer(e)}>
                            <option value="M">M</option>
                            <option value="FM">FM</option>
                        </select>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Birth day</label>
                        <input type="date" className="form-control" name="birthday" required value={this.state.birthday} onChange={(e) => this.onSetCustomer(e)}></input>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" name="email" required value={this.state.email} onChange={(e) => this.onSetCustomer(e)}></input>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Mobile</label>
                        <input type="text" className="form-control" name="mobile" required value={this.state.mobile} onChange={(e) => this.onSetCustomer(e)}></input>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" name="address" required value={this.state.address} onChange={(e) => this.onSetCustomer(e)}></input>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>City</label>
                        <input type="text" className="form-control" name="city" required value={this.state.city} onChange={(e) => this.onSetCustomer(e)}></input>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Company</label>
                        <input type="text" className="form-control" name="company" required value={this.state.company} onChange={(e) => this.onSetCustomer(e)}></input>
                    </div>
                    <div className="col-6">
                        <label>Group</label>
                        <FormControl>
                            <FormGroup>
                                {listGroup.map((item, index) => {
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
                <button type="submit" className="btn btn-outline-success" disabled={this.state.isSubmit}>{this.state.isSubmit ? <React.Fragment><i className="zmdi zmdi-rotate-right zmdi-hc-spin"></i>&nbsp;Submiting</React.Fragment> : "Submit"}</button>
            </form>
        )
    }
}
const mapStateToProps = (state) => {
    return {

        listGroup: state.group.listGroup


    }
}
function mapDispatchToProps(dispatch) {
    return {
        createACustomer: (customer) => dispatch(createACustomer(customer)),
        getListGroup: () => dispatch(getAllGroups())

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormCreateCustomer));