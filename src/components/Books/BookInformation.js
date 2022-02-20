import { Container, Row, Col, ProgressBar } from "react-bootstrap";

function BookInformation({ bookDetails }) {
  return (
    <Container fluid="md">
      <Row className="mb-4 flex-wrap">
        <Col sm>
          <div style={{ margin: "0 auto", textAlign: "center" }}>
            <h4>Book</h4>
            <img
              src={bookDetails.base64BookImage ? bookDetails.base64BookImage : "/images/imagenotavailable.png"}
              alt="book"
              style={{ height: "15rem" }}
            />
            <p>{bookDetails.bookName}</p>
          </div>
        </Col>
        <Col sm>
          <div style={{ margin: "0 auto", textAlign: "center" }}>
            <h4>Author</h4>
            <img
              src={bookDetails.base64AuthorImage ? bookDetails.base64AuthorImage : "/images/imagenotavailable.png"}
              alt="book"
              style={{ height: "15rem" }}
            />
            <p>{bookDetails.authorName}</p>
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={2} sm>
          <h3 style={{ textAlign: "center", color: bookDetails.rating > 4 ? "green" : (bookDetails.rating > 2.5 ? "rgb(255, 193, 7)" : "red" )}}>
            <span></span>
            {bookDetails.rating}
          </h3>
        </Col>
        <Col lg={10} sm>
          <ProgressBar style={{ height: "2rem"}}>
            <ProgressBar
              variant="info"
              // style={{ height: "2rem" }}
              now={bookDetails.rating * 20}
            />
            <ProgressBar
              variant="warning"
              // style={{ height: "2rem" }}
              now={100 - bookDetails.rating * 20}
            />
          </ProgressBar>
        </Col>
      </Row>
      <Row className="mb-4">
        <h3>Description</h3>
        <p>{bookDetails.description}</p>
        {/* <p>{reviews}</p> */}
      </Row>
    </Container>
  );
}

export default BookInformation;
