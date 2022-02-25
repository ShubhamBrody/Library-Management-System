import { Container, ListGroup, Row } from "react-bootstrap";
// import BookCardPlaceholder from "../Books/BookCardPlaceholder";
import { useState, useEffect, useContext } from "react";
import NotFound from "../NotFound/NotFound";
import axios from "axios";
import AuthContext from "../store/AuthContext";
import { MyBackend } from "../Api/ApiLinkGen";
// import BooksCarousel from "./BooksCarousel";

function NextDueDate() {
  const [data, setData] = useState(null);
  const [bookData, setBookData] = useState({});
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setData(null);
    console.log("came here");
    if (!authContext.user) {
      console.log("Not logged in");
      return;
    }
    console.log("bookreturns/" + authContext.user.email);
    authContext.user.email &&
      axios
        .get(
          MyBackend({
            work: "bookreturns/" + authContext.user.email,
          })
        )
        .then((res) => {
          console.log("NEXT DUE : ", res.data.results);
          setData(res.data.results);
          console.log("BOONAMES : ", res.data.bookNames);
          setBookData(res.data.bookNames);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [authContext]);

  return (
    <Container>
      <Row
        style={{
          padding: "2rem 1rem",
          marginBottom: "2rem",
          backgroundColor: "#e9ecef",
          borderRadius: ".3rem",
        }}
        className="d-flex justify-content-center"
      >
        <Row style={{ textAlign: "center" }}>
          <h5>Today's due books</h5>
        </Row>
        <Row>
          {data && bookData.length ? (
            <ListGroup style={{ width: "100%" }}>
              {data.map((book) => {
                // console.log("LIST ITEM : ", bookData.filter((b) => b.isbn === book.isbn)[0].bookName);
                if(book.bookReturned === true) return <></>;
                return (
                  <ListGroup.Item>
                    {bookData.filter((b) => b.isbn === book.isbn)[0].bookName +
                      "\n" +
                      book.bookReturnDate.toString().slice(0, 10)}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <NotFound />
          )}
        </Row>
      </Row>
    </Container>
  );
}

export default NextDueDate;
