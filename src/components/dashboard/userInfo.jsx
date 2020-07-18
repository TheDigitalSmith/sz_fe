import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";

export default class UserInfo extends Component {
  state = {
    showModal: false,
  };
  openModal = () => {
    console.log("copying props");
    this.setState({ ...this.props, showModal: true });
  };
  closeModal = async () => {
    this.setState({ showModal: false });
  };

  handleEditUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem("x_access_token");
      const token = "Bearer " + accessToken;
      const submitURL = await fetch("http://localhost:9121/api/users/me", {
        method: "PUT",
        body: JSON.stringify({ ...this.state }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (submitURL.ok) {
        const response = await submitURL.json();
        console.log("response", response);
        this.setState({ ...response });
        this.props.handleUpdateUser(response);
        console.log(this.state);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { _id, name, email, role } = this.props;

    const { showModal } = this.state;
    return (
      <Container>
        <h2>User Profile</h2>
        {showModal && (
          <Modal
            show={this.openModal}
            onHide={this.closeModal}
            backdrop="static"
            keyboards={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit user information</Modal.Title>
            </Modal.Header>
            <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="6">
                  Name
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    placeholder="Normal text"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="6">
                  email
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    placeholder="Normal text"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="6">
                  Role
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    placeholder="Normal text"
                    value={this.state.role}
                    onChange={(e) => this.setState({ role: e.target.value })}
                  />
                </Col>
              </Form.Group>
            </Form>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleEditUserInfo}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <Row>
          <Col lg={3}>
            <Card>
              <Card.Img
                variant="top"
                src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
              />
              <Button variant="primary" onClick={this.openModal}>
                Edit
              </Button>
            </Card>
          </Col>
          <Col lg={5}>
            <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Label column>{name}</Form.Label>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Label column>{email}</Form.Label>
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Role
                </Form.Label>
                <Col sm="10">
                  <Form.Label column>{role}</Form.Label>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
