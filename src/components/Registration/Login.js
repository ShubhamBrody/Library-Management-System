import { Container, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import ErrorOccured from "./ErrorOccured";
import axios from "axios";
import { MyBackend } from "../Api/ApiLinkGen";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [details, setDetails] = useState([]);
  const [erroroccured, setErroroccured] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const authctx = useContext(AuthContext);
  var numberOfElements = 3;
  const loginhandler = (arr) => {
    const data = {
      email: arr[0],
      password: arr[1],
      isAdmin: false,
    };
    console.log("data", data);
    axios
      .post(MyBackend({ work: "login" }), data)
      .then((d) => {
        console.log("This is d : ", d);
        authctx.login(data.isAdmin, d.data.username);
        navigate("/");
      })
      .catch((error) => {
        error.response
          ? setError(error.response.data)
          : setError("ServerError");
        setErroroccured(true);
      });
  };
  return (
    <Container>
      <div
        style={{
          padding: "2rem 1rem",
          marginBottom: "2rem",
          backgroundColor: "#e9ecef",
          borderRadius: ".3rem",
        }}
        className="d-flex justify-content-center"
      >
        <h3>Login Here!</h3>
      </div>
      {erroroccured ? (
        <ErrorOccured Error={error} Handle={setErroroccured} />
      ) : (
        <></>
      )}
      <Form
        value={details}
        onSubmit={(e) => {
          e.preventDefault();
          var i = 0;
          var arr = [];
          while (i < numberOfElements) {
            arr.push(e.target[i].value);
            i++;
          }
          setDetails(arr);
          loginhandler(arr);
          // setErroroccured(true);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Are you signing in as the librarian?"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
