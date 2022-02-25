import { Container } from "react-bootstrap";
import BooksBorrowed from "./BooksBorrowed";
import NextDueDate from "./NextDueDate";
import { useEffect, useContext } from "react";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (authContext.isAdmin)
      navigate("/");
  }, [authContext, navigate]);

  return (
    <Container>
      <BooksBorrowed />
      <NextDueDate />
    </Container>
  );
}

export default UserProfile;
