import React, { Component } from "react";
import loginImg from "../../Assets/img/undraw_conference_call_b0w6.svg";

export class Register extends Component {
  state = {
    name: "",
    role: "",
    email: "",
    password: "",
  };
  render() {
    return (
      <div className="base-container">
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                name="role"
                placeholder="role"
                value={this.state.role}
                onChange={(e) => this.setState({ role: e.target.value })}
              />
            </div>
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
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
