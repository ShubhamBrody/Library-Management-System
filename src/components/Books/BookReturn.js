import { Container, Button } from "react-bootstrap";
import { MyBackend } from "../Api/ApiLinkGen";
import axios from "axios";
import ErrorOccured from "../Registration/ErrorOccured";
import AuthContext from "../store/AuthContext";
import { useContext, useState } from "react";

function BookReturn({ bookDetails }) {
  const authContext = useContext(AuthContext);
  const [erroroccured, setErroroccured] = useState(false);
  const [error, setError] = useState("");
  const [variant, setVariant] = useState("danger");
  const returnbook = () => {
    axios
      .post(MyBackend({ work: "returnbook" }), {
        isbn: bookDetails.isbn,
        email: authContext.user.email,
      })
      .then((res) => {
        console.log(res.data);
        setError("Book returned successfully!");
        setErroroccured(true);
        setVariant("success");
        setTimeout(() => {
            window.location.reload();
        }, 200);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.xdata);
        setErroroccured(true);
        setVariant("danger");
      });
  };

  return (
    <Container>
      {erroroccured ? (
        <ErrorOccured Error={error} Handle={setErroroccured} variant={variant}/>
      ) : (
        <></>
      )}
      <h4>Are you sure you want to return this book ?</h4>
      <Button variant="success" onClick={() => returnbook()}>
        Yes
      </Button>
    </Container>
  );
}

export default BookReturn;
