import { Container } from "react-bootstrap";
import BooksBorrowed from "./BooksBorrowed";
// import { useEffect, useContext } from "react";
// import AuthContext from "../store/AuthContext";
// import { useNavigate } from "react-router-dom";

function UserProfile() {
  // const authContext = useContext(AuthContext);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("MY PROFILE", authContext)
  // }, [authContext, navigate]);

  return (
    <Container>
      <BooksBorrowed />
      {/* <NextDueDate /> */}
    </Container>
  );
}

export default UserProfile;
