import React, { Component } from "react";

import "../login/style.scss";
import editImg from "../../Assets/img/undraw_settings_ii2j.svg";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export class Edituser extends Component {
  state = {
    name: "",
    role: "",
    email: "",
    _id: "",
    modalState: true,
  };

  handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("x_access_token");
      const token = "Bearer " + accessToken;
      const payload = {
        name: this.state.name,
        email: this.state.email,
        role: this.state.role,
      };
      console.log("payload", payload);
      const submitURL = await fetch("http://localhost:9121/api/users/edit", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (submitURL.ok) {
        const response = await submitURL.json();
        this.props.handleChangeUserInfo(response.users);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("x_access_token");
      const token = "Bearer " + accessToken;
      const payload = {
        _id: this.state._id,
      };
      console.log("payload", payload);
      const submitURL = await fetch("http://localhost:9121/api/users/edit", {
        method: "DELETE",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (submitURL.ok) {
        const response = await submitURL.json();
        this.props.handleChangeUserInfo(response.users);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="base-container">
        <div className="content">
          <div className="image">
            <img src={editImg} alt="login" />
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
            <Button onClick={this.handleDelete}>Delete</Button>
            <Button onClick={this.handleSubmit}>Save Changes</Button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      name: this.props.name,
      email: this.props.email,
      role: this.props.role,
      modalState: true,
    });
  }
}
