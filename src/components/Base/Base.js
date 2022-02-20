import BookCard from "../Books/BooksCard.js";
import { Container, Row } from "react-bootstrap";
import Paged from "../Pagination/Pagination.js";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import BookCardPlaceholder from "../Books/BookCardPlaceholder.js";
import { MyBackend } from "../Api/ApiLinkGen";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import NotFound from "../NotFound/NotFound.js";
import AuthContext from "../store/AuthContext.js";
import { useNavigate } from "react-router-dom";

function Base() {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState("All");
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setData(null);
    console.log(authContext);
    if (authContext.isLoggedIn === false) {
      navigate("/register", {replace: true});
    } else {
      axios
        .get(
          MyBackend({
            work:
              "book/" +
              (filters.length === 0 ? "All" : filters) +
              (searchItem.length ? "&search=" + searchItem : "") +
              "&0&5",
          })
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        });
    }
  }, [filters, searchItem, authContext, navigate]);
  return (
    <div className="App">
      <Header filtersetter={setFilters} searchSetter={setSearchItem} />
      <Container fluid>
        <Row style={{ "align-items": "center", "justify-content": "center" }}>
          {data === null ? (
            <>
              <BookCardPlaceholder />
              <BookCardPlaceholder />
              <BookCardPlaceholder />
              <BookCardPlaceholder />
              <BookCardPlaceholder />
            </>
          ) : data.length > 0 ? (
            <>
              {data.map((book) => {
                console.log("data", book);
                return <BookCard bookDetails={book} />;
              })}
            </>
          ) : (
            <NotFound />
          )}
        </Row>
      </Container>
      <Paged />
      <Footer />
    </div>
  );
}

export default Base;
