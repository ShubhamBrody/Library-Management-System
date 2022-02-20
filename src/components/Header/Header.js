import { Form, Container, FormControl, Button } from "react-bootstrap";
import Filter from "./Filter.js";

function Header({ filtersetter, searchSetter, setCanSearch}) {
  return (
    <Container style={{ marginTop: "2%" }}>
      <Form
        className="d-flex"
        onSubmit={(e) => {
          e.preventDefault();
          searchSetter(e.target[0].value);
        }}
      >
        <FormControl
          type="search"
          placeholder="Search for a book"
          className="me-2"
          aria-label="Search"
          style={{ border: "3px solid #ccc" }}
          onChange={(e) => {
            if(e.target.value.length === 0) searchSetter("");
          }}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
      <Filter
        filterset={filtersetter}
        list={[
          "All",
          "Science",
          "Programming",
          "Adventure",
          "Sci-Fi",
          "Horror",
          "Romance",
          "Action",
        ]}
      />
    </Container>
  );
}

export default Header;
