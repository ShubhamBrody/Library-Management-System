import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import ErrorOccured from "./ErrorOccured";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import axios from "axios";
import { MyBackend } from "../Api/ApiLinkGen.js";
function RegistrationForm() {
  const [details, setDetails] = useState([]);
  const [erroroccured, setErroroccured] = useState(false);
  const [error, setError] = useState("");
  const value = useContext(AuthContext);
  // var numberOfElements = 5;

  const userRegistration = () => {
    const data = {
      username: details[0],
      email: details[1],
      password: details[2],
      reenteredpassword: details[3],
      securitykey: details[4],
      newsletter: details[5],
      isAdmin: value.isLoggedIn && value.isAdmin,
    }
    console.log(data);
    axios
      .post(MyBackend({ work: "register"}), data)
      .then((data) => {
        console.log("data", data);
        if(data.status !== 200) {
          setErroroccured(true);
        }
      })
      .catch((error) => {
        error.response ? setError(error.response.data) : setError("ServerError");
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
        <h3>Register Yourself Here!</h3>
      </div>
      {erroroccured ? (
        <ErrorOccured
          Error={error}
          Handle={setErroroccured}
        />
      ) : (
        <></>
      )}
      <Form
        value={details}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.length);
          var i = 0;
          var arr = [];
          console.log();
          while (i < e.target.length-1) {
            arr.push(e.target[i].value);
            i++;
          }
          setDetails(arr);
          console.log(arr);
          userRegistration();
          // setErroroccured(true);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            {"We'll never share your email with anyone else :)"}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-Enter Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Security Key</Form.Label>
          <Form.Control type="password" placeholder="Security Key" />
          <Form.Text style={{ color: "#ffcc00" }}>
            <span style={{ color: "#cc3300", fontSize: "1.5rem" }}>
              {" ! "}
            </span>
            Please keep the security key safe. You can only change your password
            if you have this security key
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Do you want to recieve mails about new books in your favourite criteria?"
          />
        </Form.Group>
        {value.isLoggedIn && !value.isAdmin ? (
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="New Admin registration?" />
          </Form.Group>
        ) : (
          <div></div>
        )}
        <Form.Group className="mb-3" controlId="formBasicText">
          <Button variant="primary" type="submit">
            Register
          </Button>{" "}
          <Form.Text>
            Already a customer ? Go to <a href="/login">Login</a>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default RegistrationForm;
