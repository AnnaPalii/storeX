import React, { Component } from "react";
import userAPI from "../utils/userAPI";
import {  Redirect, Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";

class Signup extends Component {
  state = {
    email: "1@1",
    username: "one",
    role:"Host",
    password: "1",
    passwordConf: "1"
  };

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
      userAPI.signup({
        username: this.state.username,
        email: this.state.email,
        role:this.state.role,
        password: this.state.password,
        passwordConf: this.state.passwordConf,

      })
        .then(res => {
          if(res.status === 200 ){
            this.props.authenticate();
            
          }
        })
        .catch(err => console.log(err.response.data));
    }
  }
  render(){
    return(<div>
      <Container fluid>
      <Row>
      <header style={{ textAlign: "left", fontSize:"40px", display: "block", padding: 20 }}>
        Welcome to StoreX
      </header>
        </Row>

        <Row>
          <select value={this.state.role} onChange={this.handleInputChange}>
            <option value="Guest">Guest</option>
            <option value="Host">Host</option>
            </select></Row>

        <Row>
          <Col size="6">
          <form>
            <label>
              Username:
            <Input
              value={this.state.username}
              onChange={this.handleInputChange}
              name="username"
              placeholder="Username (required)"
            />
            </label>
            </form>
          <form>
            <label>
              Email:
            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="Email (required)"
            />
            </label>
            </form>
          <form>
            <label>
              Password:
            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              placeholder="Password (required)"
              type="password"
            />
            </label>
            </form>
            <FormBtn
              //disabled={!(this.state.email && this.state.password)}
              onClick={this.handleFormSubmit}
            >
              Sign up
            </FormBtn>
          </Col>
        </Row>
        </Container> 
      </div>
    )
  }
}

  class Login extends Component {
    state = {
        email: "",
        password: ""
    };
  
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
      userAPI.loginUser({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if(res.status === 200 ){
          this.props.setUserState(res.data)
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (<div>
      <Container fluid>
        <Row>
          <Col size="6">
            <form>
            <label>
              Username:
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email (required)"
              />
              </label>
            </form>
            <form>
            <label>
              Password:
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="password (required)"
                type="password"
              />
              </label>
            </form>
              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Log in
              </FormBtn>
      
          </Col>
        </Row>
      </Container>

            {/* redirect on authenticated */}
          {this.props.authenticated &&
        this.state.role === "Host" 
        ? <Redirect to='/comments'/>: <div></div>}
</div>
    );
  }
}


class SignIn extends Component{


  test(){
    console.log(this.props);
    console.log(this.props.userState);
  console.log(this.props.authenticate);

  }
render(){
  this.test();
  return(
  <div>
  <Signup user={this.props.userState}
          authenticate={this.props.authenticate} />
  <Login setUserState={this.props.setUserState}
         authenticate={this.props.authenticate}
    />
</div>
  )
}
}

export default SignIn;