import { Container, Card, ProgressBar, Row, Col } from "react-bootstrap";
import { useState } from "react";

function AdminSideBook() {
  return (
    <Card style={{ width: "50%" }}>
      <Card.Header variant="top">
        <h3 style={{ margin: "0 auto", height: "100%" }}>Book Name</h3>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <h2>26 / 42</h2>
            <ProgressBar style={{ height: "1.5rem" }}>
              <ProgressBar variant="success" now={25} />
              <ProgressBar variant="danger" now={75} />
            </ProgressBar>
          </Col>
          <Col>
            <h4>Total Book lent</h4>
            <h2 style={{ color: "rgba(var(--bs-success-rgb)" }}>127</h2>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default AdminSideBook;
