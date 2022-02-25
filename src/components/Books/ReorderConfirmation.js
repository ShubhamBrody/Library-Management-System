import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import { MyBackend } from "../Api/ApiLinkGen";
import AuthContext from "../store/AuthContext";
import { useState, useContext } from "react";
import ErrorOccured from "../Registration/ErrorOccured";

function ReorderConfirmation({ bookDetails }) {
  const authContext = useContext(AuthContext);
  const [erroroccured, setErroroccured] = useState(false);
  const [error, setError] = useState("");
  const [days, setDays] = useState(0);
  const [variant, setVariant] = useState("danger");

  const reorderbook = () => {
    console.log(bookDetails);
    axios
      .post(MyBackend({ work: "reorderbook" }), {
        email: authContext.user.email,
        isbn: bookDetails.isbn,
        days: days,
      })
      .then((res) => {
        setError("Book reordered successfully!");
        setErroroccured(true);
        setVariant("success");
      })
      .catch((err) => {
        setError(err.response.data);
        setErroroccured(true);
        setVariant("danger");
      });
  };

  return (
    <Container>
      {erroroccured ? (
        <ErrorOccured
          Error={error}
          Handle={setErroroccured}
          variant={variant}
        />
      ) : (
        <></>
      )}
      <p style={{ margin: "2rem auto", textAlign: "center" }}>
        Are you sure you want to reorder this book ?{" "}
      </p>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (days > 30 || days < 5) {
            setError(
              days > 30
                ? "You can't reorder for more than 30 days"
                : "You can't reorder for less than 5 days"
            );
            setVariant("danger");
            setErroroccured(true);
          } else {
            reorderbook();
          }
        }}
      >
        <Form.Group className="mb-3">
          <Form.Text>Enter number of days to reorder for</Form.Text>
          <Form.Control
            type="number"
            placeholder="Enter number of days"
            onChange={(e) => {
              setDays(e.target.value);
            }}
          />
        </Form.Group>
        <Button className="lg" variant="outline-success" type="submit">
          Reorder
        </Button>
      </Form>
    </Container>
  );
}

export default ReorderConfirmation;
