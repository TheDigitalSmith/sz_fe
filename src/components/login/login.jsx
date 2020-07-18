import React, { Component } from "react";
import loginImg from "../../Assets/img/undraw_conference_call_b0w6.svg";
import auth from "../../auth";

export class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSignin = () => {
    auth.login(() => {
      this.props.history.push("/dashboard");
    });
  };
  render() {
    return (
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            type="button"
            className="btn-primary"
            onClick={this.handleSignin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
