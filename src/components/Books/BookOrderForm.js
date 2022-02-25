import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import ErrorOccured from "../Registration/ErrorOccured";
import axios from "axios";
import { MyBackend } from "../Api/ApiLinkGen";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
function BookOrderForm({ bookDetails }) {
  const [erroroccured, setErroroccured] = useState(false);
  const [variant, setVariant] = useState("danger");
  const [error, setError] = useState("");
  const authctx = useContext(AuthContext);
  const [value, setValue] = useState({
    email: authctx.user.email,
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    isbn: bookDetails.isbn,
    bookReturnDate: "",
    bookReturned: false,
    bookReturnedDate: null,
  });

  const dbUpdate = () => {
    axios
      .post(MyBackend({ work: "orderbook/" }), value)
      .then((res) => {
        console.log(res);
        setErroroccured(true);
        setVariant("success");
        setError("Book ordered successfully!");
      })
      .catch((err) => {
        console.log("The error: ", err);
        setErroroccured(true);
        setVariant("danger");
        setError(err.response.data);
      });
  };

  const valuesetter = (key, value) => {
    setValue((prev) => {
      return {
        ...prev,
        ...{ [key]: value },
      };
    });
  };

  const valuechangehandler = (e) => {
    e.preventDefault();
    Object.keys(value).forEach((key) => {
      if (key !== 'bookReturnedDate' && (value[key] === "" || value[key] === null)) {
        setError("Please fill all values before proceding");
        setVariant("danger");
        setErroroccured(true);
      }
      return;
    });
    var currDate = new Date(new Date().toISOString().split('T')[0]);
    var days = new Date(value.bookReturnDate) - currDate;
    days = days / (1000 * 3600 * 24);
    console.log("BOOK ORDER FORM DATE DIFF", currDate, days, value.bookReturnDate);
    if (days < 0) {
      setError("Date cannot be in the past");
      setVariant("danger");
      setErroroccured(true);
      return;
    } else if (days === 0) {
      setError("Date cannot be today");
      setVariant("danger");
      setErroroccured(true);
      return;
    } else if (days > 30) {
      setError("Date cannot be more than 30 days from issue date.");
      setVariant("danger");
      setErroroccured(true);
      return;
    }
    dbUpdate();
  };

  return (
    <Container>
      {erroroccured ? (
        <ErrorOccured Error={error} Handle={setErroroccured} variant={variant}/>
      ) : (
        <></>
      )}
      <Form value={value} onSubmit={(e) => valuechangehandler(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Recipient's Name'</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={(e) => {
              valuesetter("name", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address Line 1"
            onChange={(e) => {
              valuesetter("addressLine1", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address Line 2"
            onChange={(e) => {
              valuesetter("addressLine2", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            onChange={(e) => {
              valuesetter("city", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="State"
            onChange={(e) => {
              valuesetter("state", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zip Code"
            onChange={(e) => {
              valuesetter("zip", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            onChange={(e) => {
              valuesetter("country", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone Number"
            onChange={(e) => {
              valuesetter("phone", e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Book Return Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => {
              valuesetter("bookReturnDate", new Date(e.target.value).toISOString().split('T')[0]);
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
