import React, { Component } from "react";

import userAPI from "../utils/userAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import remote from "../img/remote.gif";
import tv from "../img/tv.gif";

class Login extends Component {
  state = {
    email: "",
    password: "",
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
      userAPI.loginUser({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
            this.props.setUserState(res.data)
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>

          <Col size="4">

          </Col>

          {this.state.loading === false ?
            <Col size="4">

              <h2 className="kakeiboFont">Sign in </h2>
              <hr />
              <h6>Welcome back!</h6>

              <form className="signupMargin">
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
                  placeholder="password (required)"
                  type="password"
                />

                <div className="signupMargin2">
                  <FormBtn
                    disabled={!(this.state.email && this.state.password)}
                    onClick={this.handleFormSubmit}
                  >
                    Sign in
              </FormBtn>
                </div>
                <hr />
                <Link to="/signup">
                  <FormBtn> Signup Today </FormBtn>
                </Link>
              </form>
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
      </Container>
    );
  }
}

export default Login;