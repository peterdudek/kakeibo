import React, { Component } from "react";

import userAPI from "../utils/userAPI";
import { Redirect, Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
// import logo from "../img/loading 3.gif";
import remote from "../img/remote.gif";
import tv from "../img/tv.gif";

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConf: "",
    loading: false
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
    this.setState({ loading: true });
    if (this.state.email && this.state.password) {
      userAPI.signup({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        passwordConf: this.state.passwordConf,

      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
            this.props.authenticate();

            return <Redirect to="/subscriptions" />
          }
        })
        .catch(err => console.log(err.response.data));
    }
  };

  render() {
    return (
      <Container fluid>
        <div className="signupMargin">
          <Row>
            <Col size="4">

            </Col>
            {this.state.loading === false ?
              <Col size="4">
                <h2 className="kakeiboFont">Sign up today </h2>
                <hr />
                <h6>Start saving on your streaming</h6>

                <form className="signupMargin">
                  <Input
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    name="username"
                    placeholder="username"
                  />
                  <Input
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    name="email"
                    placeholder="email"
                  />
                  <Input
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="password"
                    placeholder="password"
                    type="password"
                  />
                  <Input
                    value={this.state.passwordConf}
                    onChange={this.handleInputChange}
                    name="passwordConf"
                    placeholder="confirm password"
                    type="password"
                  />

                  <FormBtn
                    disabled={!(this.state.email && this.state.passwordConf)}
                    onClick={this.handleFormSubmit}
                  >
                    Signup
              </FormBtn>
                  <hr />
                  <div className="">
                    <Link to="/">
                      <FormBtn>
                        Back to Login Page
                    </FormBtn>
                    </Link>
                  </div>
                </form>
                <div>
                  {/* <img alt="loading" src={logo} style={{height: 100}}/> */}
                </div>

              </Col>
              :
              <div className="signupMargin2">
                <Row>
                  <div className="w-100 mx-auto">
                    <img alt="loading" src={tv} style={{ height: 250 }} />
                  </div>


                </Row>

                <Row>
                  <div className="w-0 mx-auto">
                    <img alt="loading" src={remote} style={{ height: 250 }} />
                  </div>
                </Row>
              </div>

            }


            <Col size="4">

            </Col>


          </Row>
        </div>
        {/* redirect on authenticated */}
        {this.props.authenticated ? <Redirect to='/subscriptions' /> : <div></div>}

      </Container>
    );
  }
}

export default Signup;