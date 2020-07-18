import React, { Component } from "react";

import { Register } from "../login/register";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { Edituser } from "./edituser";

export default class User extends Component {
  state = {
    name: "",
    role: "",
    email: "",
    password: "",
    modalState: false,
    openUserModal: false,
  };

  openModal = () => {
    this.setState({
      modalState: true,
      name: "",
      role: "",
      email: "",
      password: "",
    });
  };

  openUserModal = (name, role, email) => {
    this.setState({
      openUserModal: true,
      name: name,
      role: role,
      email: email,
      password: "",
    });
  };
  closeUserModal = () => {
    this.setState({ openUserModal: false });
  };

  closeModal = () => {
    this.setState({ modalState: false });
  };

  handleChangeUserInfo = (user) => {
    this.props.handleChangeUserInfo(user);
  };

  handleAddUser = async () => {
    try {
      const accessToken = localStorage.getItem("x_access_token");
      const token = "Bearer " + accessToken;
      const payload = {
        name: this.state.name,
        email: this.state.email,
        role: this.state.role,
        password: this.state.password,
      };
      console.log("payload", payload);
      const submitURL = await fetch("http://localhost:9121/api/users/add", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (submitURL.ok) {
        const response = await submitURL.json();
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { users, role } = this.props;
    return (
      <Container style={{ "margin-top": "50px" }}>
        <Row>
          <h2>Users</h2>
          {role === "Writer" && (
            <Button onClick={this.openModal} style={{ "margin-left": "auto" }}>
              Add User
            </Button>
          )}
        </Row>
        {this.state.modalState && (
          <Modal
            show={this.openModal}
            onHide={this.closeModal}
            backdrop="static"
            keyboards={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Register></Register>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleAddUser}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {this.state.openUserModal && (
          <Modal
            show={this.openUserModal}
            onHide={this.closeUserModal}
            backdrop="static"
            keyboards={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Edituser
              name={this.state.name}
              email={this.state.email}
              role={this.state.role}
              modalState={this.state.openUserModal}
              handleChangeUserInfo={this.handleChangeUserInfo}
            ></Edituser>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeUserModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <Row>
          {users.length !== 0 ? (
            users.map((u) => (
              <Col lg={3}>
                <Card className="mt-2 mb-2" key={u._id}>
                  <Card.Body>
                    <Card.Title>{u.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Role: {u.role}
                    </Card.Subtitle>
                    <Card.Text>Contact Information {u.email}</Card.Text>
                    {role === "Writer" && (
                      <Button
                        onClick={() =>
                          this.openUserModal(u.name, u.role, u.email)
                        }
                        style={{ "margin-left": "auto" }}
                      >
                        Edit User
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col lg={12}>
              <Card className="mt-2 mb-2">
                <Card.Body>
                  <Card.Title>No records of Users</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}
