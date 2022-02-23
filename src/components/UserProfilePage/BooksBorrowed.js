import { Container, Row } from "react-bootstrap";
import BookCardPlaceholder from "../Books/BookCardPlaceholder";
import { useState, useEffect, useContext } from "react";
import NotFound from "../NotFound/NotFound";
import axios from "axios";
import AuthContext from "../store/AuthContext";
import { MyBackend } from "../Api/ApiLinkGen";
import BooksCarousel from "./BooksCarousel";

function BooksBorrowed() {
  const [data, setData] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setData(null);
    console.log("came here");
    if(!authContext.user){
      console.log("not logged in");
      return;
    }
    axios
      .post(
        MyBackend({
          work: "borrowedbooks/",
        }),
        { email: authContext.user.email }
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authContext]);

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
        <h5>Books Borrowed</h5>
      </div>
      <Row style={{ "align-items": "center", "justify-content": "center" }}>
        {data === null ? (
          <>
            <BookCardPlaceholder />
            <BookCardPlaceholder />
            <BookCardPlaceholder />
            <BookCardPlaceholder />
          </>
        ) : data.length > 0 ? (
            <BooksCarousel books={data}/>
        ) : (
          <NotFound />
        )}
      </Row>
    </Container>
  );
}

export default BooksBorrowed;
