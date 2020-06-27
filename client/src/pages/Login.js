import React, { Component } from "react";

import userAPI from "../utils/userAPI";
import {  Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";


class Login extends Component {
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    
  }
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
    console.log(this.state.email)
      
      userAPI.loginUser({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if(res.status === 200 ){
            this.props.setAuthenticated(true);
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
 
            <form>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="(required)"
                type="password"
              />
              
              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Log in
              </FormBtn>
            </form>
          </Col>
          
        </Row>

        {/* Redirect on authentication */}
        {this.props.authenticated ? <Redirect to='/home'/> : <></>}
      </Container>
    );
  }
}

export default Login;
