import { Form, Button, Container, Alert } from "react-bootstrap";
import { useState } from "react";
import ErrorOccured from "../Registration/ErrorOccured";
import axios from "axios";
import { MyBackend } from "../Api/ApiLinkGen";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
function BookOrderForm({ bookDetails }) {
  const [value, setValue] = useState([]);
  const [erroroccured, setErroroccured] = useState(false);
  const [error, setError] = useState("");
  const authctx = useContext(AuthContext);

  const dbUpdate = () => {
    const data = {
      email: authctx.user.email,
      name: value[0],
      addressLine1: value[1],
      addressLine2: value[2],
      city: value[3],
      state: value[4],
      zip: value[5],
      country: value[6],
      phone: value[7],
      isbn: bookDetails.isbn,
      bookReturnDate: new Date(value[8]),
      bookReturned: false,
      bookReturnedDate: null,
    };
    axios
      .post(MyBackend({ work: "orderbook/" }), data)
      .then((res) => {
        console.log(res);
        <Alert>res.data</Alert>;
      })
      .catch((err) => {
        console.log("The error: ",err);
        setErroroccured(true);
        setError(err.response.data);
      });
  };

  const valuechangehandler = (e) => {
    e.preventDefault();
    var currDate = new Date();
    var days = Math.ceil(
      (new Date(e.target[8].value) - currDate) / 1000 / 60 / 60 / 24
    );
    if (days < 0) {
      setError("Date cannot be in the past");
      setErroroccured(true);
      return;
    } else if (days === 0) {
      setError("Date cannot be today");
      setErroroccured(true);
      return;
    } else if (days > 30) {
      setError("Date cannot be more than 30 days from issue date.");
      setErroroccured(true);
      return;
    }
    var i = 0;
    var arr = [];
    while (i < e.target.length - 1) {
      arr.push(e.target[i].value);
      i++;
    }
    setValue(arr);
    console.log(arr);
    dbUpdate();
  };

  return (
    <Container>
      {erroroccured ? (
        <ErrorOccured Error={error} Handle={setErroroccured} />
      ) : (
        <></>
      )}
      <Form value={value} onSubmit={(e) => valuechangehandler(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Recipient's Name'</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control type="text" placeholder="Address Line 1" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control type="text" placeholder="Address Line 2" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="text" placeholder="Zip Code" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Country" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Phone Number" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Book Return Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => {
              console.log("The date selected is : ");
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default BookOrderForm;
