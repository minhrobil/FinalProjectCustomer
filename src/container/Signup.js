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
class Signup extends Component {
   state = {
      email: '',
      password: ''
   }

   onChangeData(event) {
      this.setState({
         [event.target.name]: event.target.value
      })
   }
   onUserSignIn() {
      this.props.history.push('/login');
   }
   submit(event) {
      event.preventDefault();
      this.props.login({
         email: this.state.email,
         password: this.state.password
      }).then(res => {
         this.props.history.push('/');
      })
   }

   render() {
      const token = getCookie('token');
      const { loading } = this.props;
      if (token) return (<Redirect to='/app/dashboard' />)
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
               {loading &&
                  <LinearProgress />
               }
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">

                              <img src="data:image/jpeg;base64,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" alt="session-logo" className="img-fluid" width="120" height="750" />

                           </div>
                           <div>
                              <a className="mr-15" onClick={() => this.onUserSignIn()}>Already have an account?</a>
                              <Button variant="contained" className="btn-light" onClick={() => this.onUserSignIn()}>Sign In</Button>
                           </div>
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper">
                  <div className="container">
                     <div className="row row-eq-height">
                        <div className="col-sm-6 col-md-7 col-lg-12">
                           <div className="session-body text-center">
                              <div className="session-head mb-15">
                                 <h2>Get started with </h2>
                              </div>
                              <Form>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type="text"

                                       name="user-name"
                                       id="user-name"
                                       className="has-input input-lg"
                                       placeholder="Enter Your Name"
                                       onChange={(e) => this.setState({ name: e.target.value })}
                                    />
                                    <span className="has-icon"><i className="ti-user"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type="mail"

                                       name="user-mail"
                                       id="user-mail"
                                       className="has-input input-lg"
                                       placeholder="Enter Email Address"
                                       onChange={(e) => this.setState({ email: e.target.value })}
                                    />
                                    <span className="has-icon"><i className="ti-email"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input

                                       type="Password"
                                       name="user-pwd"
                                       id="pwd"
                                       className="has-input input-lg"
                                       placeholder="Password"
                                       onChange={(e) => this.setState({ password: e.target.value })}
                                    />
                                    <span className="has-icon"><i className="ti-lock"></i></span>
                                 </FormGroup>
                                 <FormGroup className="mb-15">
                                    <Button
                                       className="btn-info text-white btn-block w-100"
                                       variant="contained"
                                       size="large"
                                       onClick={() => this.onUserSignUp()}>
                                       Sign Up
                            			</Button>
                                 </FormGroup>
                              </Form>



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


export default Signup;