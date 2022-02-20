import { Pagination, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

function Paged({ postsPerPage, totalPosts, paginate, currPage }) {
  var pages = Math.ceil(totalPosts / postsPerPage);
  const [pageWindow, setPageWindow] = useState([1, Math.min(3, pages)]);

  useEffect(() => {
    setPageWindow([1, Math.min(3, pages)]);
  }, [totalPosts, pages]);

  var offset = pageWindow[1] - pageWindow[0];
  
  const pagesCounter = () => {
    const pageNumbers = [];
    console.log(pageWindow);
    for (let i = pageWindow[0]; i <= pageWindow[1]; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const updater = (work) => {
    if (work === "D")
      setPageWindow((prev) => {
        if (prev[0] - offset <= 0) {
          return [1, 1 + offset];
        } else {
          return [prev[0] - offset, prev[1] - offset];
        }
      });
    else
      setPageWindow((prev) => {
        if (prev[1] + offset > pages) {
          return [pages - offset, pages];
        } else {
          console.log(prev[1] + offset);
          return [prev[0] + offset, prev[1] + offset];
        }
      });
  };
  return (
    <Container style={{ marginTop: "20px" }}>
      <Pagination style={{ alignItems: "center", justifyContent: "center" }}>
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev
          onClick={() => paginate(currPage - 1 === 0 ? 1 : currPage - 1)}
        />
        <Pagination.Ellipsis onClick={() => updater("D")} />
        {pagesCounter().map((number) => (
          <Pagination.Item
            key={number}
            active={number === currPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Ellipsis onClick={() => updater("I")} />
        {/* <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item> */}
        <Pagination.Next
          onClick={() => paginate(currPage === pages ? currPage : currPage + 1)}
        />
        <Pagination.Last
          onClick={() => paginate(currPage === pages ? currPage : pages)}
        />
      </Pagination>
    </Container>
  );
}

export default Paged;
