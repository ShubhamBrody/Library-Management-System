import {
  Container,
  Col,
  Row,
  FormGroup,
  Form,
  FormControl,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import BookCard from "../../Books/BooksCard";
import { useState } from "react";
import { MyBackend } from "../../Api/ApiLinkGen";
import axios from "axios";

function AddBook() {
  const [details, setDetails] = useState({
    bookName: "",
    authorName: "",
    genre: "",
    base64BookImage: "",
    base64AuthorImage: "",
    description: "",
    isbn: "",
    rating: "",
    quantity: 0,
  });

  function handler(obj) {
    setDetails((prevdetails) => {
      return {
        ...prevdetails,
        ...obj,
      };
    });
  }

  const addBookToDB = () => {
    axios
      .post(MyBackend({ work: "addbook" }), details)
      .then(() => {
        console.log("Successfully Added the book!!");
      })
      .catch((error) => {
        console.log("Error Occured : ", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <h3 style={{ margin: "10% auto", textAlign: "center" }}>
              Add Book Form
            </h3>
          </Row>
          <Form
            style={{
              margin: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#e9ecef",
            }}
            onChange={(value) => {
              console.log("FORM", value);
            }}
            onSubmit={addBookToDB}
          >
            <FormGroup className="mb-3">
              <Form.Label>Enter book Name : </Form.Label>
              <FormControl
                type="text"
                placeholder="Book Name"
                onChange={(val) => handler({ bookName: val.target.value })}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Enter author Name : </Form.Label>
              <FormControl
                type="text"
                placeholder="Author Name"
                onChange={(val) => handler({ authorName: val.target.value })}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Genre : </Form.Label>
              <FormControl
                type="text"
                placeholder="Genre"
                onChange={(val) => handler({ genre: val.target.value })}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Provide Author Image : </Form.Label>
              <FormControl
                id="inputter"
                type="text"
                placeholder="Author Picture URL"
                onChange={(val) =>
                  handler({ base64AuthorImage: val.target.value })
                }
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Provide Book Image : </Form.Label>
              <FormControl
                type="text"
                placeholder="Book Picture URL"
                onChange={(val) =>
                  handler({ base64BookImage: val.target.value })
                }
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Provide Description : </Form.Label>
              <FormControl
                as="textarea"
                placeholder="Description"
                onChange={(val) => handler({ description: val.target.value })}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Enter book rating : </Form.Label>
              <FormControl
                type="text"
                placeholder="Rating"
                onChange={(val) => handler({ rating: val.target.value })}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Enter book ISBN : </Form.Label>
              <FormControl
                type="text"
                placeholder="ISBN"
                onChange={(val) => handler({ isbn: val.target.value })}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Enter the quantity of books : </Form.Label>
              <FormControl
                type="number"
                placeholder="Quantity"
                onChange={(val) => handler({ quantity: val.target.value })}
              />
            </FormGroup>
            <ButtonGroup>
              <Button variant="outline-success" type="submit">
                Add Book
              </Button>
              <Button variant="outline-danger">Cancel</Button>
            </ButtonGroup>
          </Form>
        </Col>
        <Col>
          <Container>
            <h3 style={{ margin: "10% auto", textAlign: "center" }}>Preview</h3>
            <BookCard dummy bookDetails={details} margin={"30% auto"} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default AddBook;
