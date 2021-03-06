import { Button, Card, Badge, Col, Row } from "react-bootstrap";
import { useState } from "react";
import BookModal from "./BookModal.js";
import BookOrderForm from "./BookOrderForm.js";
import BookInformation from "./BookInformation.js";
import ReorderConfirmation from "./ReorderConfirmation.js";
import BookReturn from './BookReturn.js';

function BookCard(props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalBookDetails, setModalBookDetails] = useState(false);
  const [modalReorder, setModalReorder] = useState(false);
  const [modalReturn, setModalReturn] = useState(false);
  var cut = props.bookDetails["bookName"].length > 21 ? 25 : 40;
  // console.log("Inbook", props.bookDetails);
  return (
    <Card
      style={{
        width: "16rem",
        height: "30rem",
        margin: props.margin ? props.margin : "1rem",
      }}
    >
      <div style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          style={{ height: "18rem" }}
          src={
            props.bookDetails && props.bookDetails["base64BookImage"]
              ? props.bookDetails.base64BookImage
              : "/images/previewbookimage.jpg"
          }
          onClick={() => setModalBookDetails(true)}
        />
        <Card.Body>
          <Badge pill bg="primary">
            {props.bookDetails && props.bookDetails["genre"] !== ""
              ? props.bookDetails["genre"]
              : "Genre"}
          </Badge>
          <Card.Title onClick={() => setModalBookDetails(true)}>
            {props.bookDetails && props.bookDetails["bookName"] !== ""
              ? props.bookDetails["bookName"]
              : "Book Name"}
          </Card.Title>
          <Card.Text onClick={() => setModalBookDetails(true)}>
            {props.bookDetails && props.bookDetails["description"] !== ""
              ? props.bookDetails["description"].substring(0, cut) +
                (props.bookDetails["description"].length > cut ? "..." : "")
              : "This book is known for this and that..."}
          </Card.Text>
          {props.toshow ? (
            <Button
              style={{ width: "100%" }}
              variant="outline-success"
              onClick={() => {
                !props.dummy && setModalShow(true);
              }}
            >
              Request this book
            </Button>
          ) : (
            <Row className="mb-4 flex-wrap">
              <Col>
                <Button
                style={{ width: "100%" }}
                  variant="outline-success"
                  onClick={() => {
                    !props.dummy && setModalReorder(true);
                  }}
                >
                  Reorder
                </Button>
              </Col>
              <Col>
                <Button
                style={{ width: "100%" }}
                  variant="outline-success"
                  onClick={() => {
                    !props.dummy && setModalReturn(true);
                  }}
                >
                  Return
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </div>
      <BookModal
        show={modalShow}
        title={"Request for " + props.bookDetails.bookName}
        element={<BookOrderForm bookDetails={props.bookDetails} />}
        subtitle="Fill the request form : "
        onHide={() => setModalShow(false)}
      />
      <BookModal
        show={modalBookDetails}
        title={
          props.bookDetails && props.bookDetails["bookName"] !== ""
            ? props.bookDetails["bookName"]
            : "Unknown Book"
        }
        element={<BookInformation bookDetails={props.bookDetails} />}
        // subtitle="The book that you inspected is this..."
        onHide={() => setModalBookDetails(false)}
      />
      <BookModal
        show={modalReturn}
        title={"Return " + props.bookDetails.bookName}
        element={<BookReturn bookDetails={props.bookDetails} />}
        subtitle="Return the book : "
        onHide={() => setModalReturn(false)}
      />
      <BookModal
        show={modalReorder}
        title={props.bookDetails.bookName}
        element={<ReorderConfirmation bookDetails={props.bookDetails} />}
        subtitle="Re-order Confirmation : "
        onHide={() => setModalReorder(false)}
      />
    </Card>
  );
}

export default BookCard;
