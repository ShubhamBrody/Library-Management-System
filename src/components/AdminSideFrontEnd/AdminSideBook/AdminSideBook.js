import { Card, ProgressBar, Row, Col } from "react-bootstrap";
// import { useState } from "react";

function AdminSideBook({ details }) {
  var filtdet = details.filter((book) => {
    return !book.bookReturned;
  });
  return (
    <Card>
      <Card.Header variant="top">
        <h3 style={{ margin: "0 auto", height: "100%" }}>Today's Statistics</h3>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <h2>{"Books Returned : "+details.length}</h2>
            <ProgressBar style={{ height: "1.5rem" }}>
              <ProgressBar
                variant="success"
                now={100 - (100 * filtdet.length) / details.length}
              />
              <ProgressBar
                variant="danger"
                now={(100 * filtdet.length) / details.length}
              />
            </ProgressBar>
          </Col>
          <Col>
            <h4>Total Book lent</h4>
            <h2 style={{ color: "rgba(var(--bs-success-rgb)" }}>
              {details.length}
            </h2>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default AdminSideBook;
