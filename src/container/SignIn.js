import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from 'Actions/AuthActions';
import { withRouter, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Input } from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import QueueAnim from 'rc-queue-anim';
import LinearProgress from '@material-ui/core/LinearProgress';
import { setCookie, removeCookie, getCookie } from '../helpers/session';
class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    onChangeData(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onUserSignUp() {
        this.props.history.push('/signup');
    }
    submit(event) {
        event.preventDefault();
        this.props.login({
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            this.props.history.push('/app/dashboard');
        })
    }
    // componentDidUpdate(){
    //     this.props.authUser.
    // }
    render() {
        const token = getCookie('token');
        if(token){ return (<Redirect to={'app/dashboard'} />);}
        const { authUserRes } = this.props;
        return (
            <QueueAnim type="bottom">
                <div className="rct-session-wrapper">
                    {authUserRes.isLoading &&
                        <LinearProgress />
                    }
                    <AppBar position="static" className="session-header">
                        <Toolbar>
                            <div className="container">
                                <div className="d-flex justify-content-between">
                                    <div className="session-logo">


                                    </div>
                                   
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className="session-inner-wrapper">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm- col-md-7 col-lg-8 ">
                                    <div className="session-body text-center">
                                        <div className="session-head mb-30">
                                            <h1 className="font-weight-bold">Go Panda</h1>

                                        </div>
                                        <Form onSubmit={(event) => this.submit(event)}>
                                            <FormGroup className="has-wrapper">
                                                <Input
                                                    type="mail"
                                                    required
                                                    name="email"
                                                    id="user-mail"
                                                    className="has-input input-lg"
                                                    placeholder="Enter Email Address"
                                                    // onChange={(event) => this.setState({ email: event.target.value })}
                                                    onChange={(event) => this.onChangeData(event)}
                                                />
                                                <span className="has-icon"><i className="ti-email"></i></span>
                                            </FormGroup>
                                            <FormGroup className="has-wrapper">
                                                <Input
                                                    type="Password"
                                                    name="password"
                                                    id="pwd"
                                                    className="has-input input-lg"
                                                    placeholder="Password"
                                                    // onChange={(event) => this.setState({ password: event.target.value })}
                                                    onChange={(event) => this.onChangeData(event)}
                                                />
                                                <span className="has-icon"><i className="ti-lock"></i></span>
                                            </FormGroup>
                                            <FormGroup className="mb-15">
                                                <Button
                                                    color="primary"
                                                    className="btn-block text-white w-100"
                                                    variant="contained"
                                                    size="large"
                                                    // onClick={(event) => this.submit(event)}
                                                    type="submit"
                                                >
                                                    Sign In
                            			</Button>
                                            </FormGroup>
                                            {/* <FormGroup className="mb-15">
                                                <Button
                                                    className="btn-info text-white btn-block w-100"
                                                    variant="contained"
                                                    size="large"
                                                    onClick={() => this.onUserSignUp()}>
                                                    Sign Up
                            			</Button>
                                            </FormGroup> */}
                                        </Form>

                                    </div>

                                </div>
                                <div className="col-sm-5 col-md-5 col-lg-4">

                                    {/* <h1 className=" text-danger font-weight-bold text-center">Get started travel admin</h1> */}
                                    <div className="row h-300">
                                        <div className="col  my-auto">
                                            <div className=" w-500">
                                                <h1 className="display-3 text-white font-weight-bold text-center">Travel </h1>
                                                <h1 className=" text-white font-weight-bold text-center"> Stay with us, Feel at home </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        )
    }
}
function mapStateToProps({ authUser }) {
    return {
        authUserRes: authUser
    }
}

export default withRouter(connect(mapStateToProps, {login})(Login));