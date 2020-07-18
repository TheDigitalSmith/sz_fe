import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import UserInfo from "./userInfo";
import Users from "./users";

export class Dashboard extends Component {
  state = {
    name: "admin",
    email: "admin@admin.com",
    role: "Writer",
    _id: "1",
    users: [
      { name: "Tash", email: "tash@gmail.com", role: "Writer", _id: "1" },
      {
        name: "Aneiq",
        email: "aneiq@gmail.com",
        role: "Reader",
        _id: "1",
      },
      {
        name: "Shamshul",
        email: "shamshul@gmail.com",
        role: "Writer",
        _id: "1",
      },
    ],
  };

  handleChangeUserInfo = (Users) => {
    this.setState({ users: Users });
  };

  handleUpdateUser = (user) => {
    this.setState({ name: user.name, role: user.role, email: user.email });
  };
  render() {
    const { name, email, role, _id, users } = this.state;
    return (
      <Container>
        <UserInfo
          name={name}
          role={role}
          _id={_id}
          email={email}
          handleUpdateUser={this.handleUpdateUser}
        ></UserInfo>
        <Users
          users={users}
          role={role}
          _id={_id}
          handleChangeUserInfo={this.handleChangeUserInfo}
        ></Users>
        {/* <DiseaseList
          diseases={diseases}
          handleDiseaseChange={this.handleDiseaseChange}
        ></DiseaseList> */}
      </Container>
    );
  }
  componentDidMount = async () => {
    try {
      const accessToken = localStorage.getItem("x_access_token");
      const token = "Bearer " + accessToken;
      console.log("userProfileToken", token);
      const submitURL = await fetch("http://localhost:9121/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const response = await submitURL.json();
      this.setState({ ...response });
    } catch (err) {
      console.log(err);
    }
  };
}
