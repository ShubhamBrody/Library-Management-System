import { useState } from "react";
import { Carousel } from "react-bootstrap";
import BookCard from "../Books/BooksCard";

function BooksCarousel({ books }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
      {books.map((book) => {
        return (
          <Carousel.Item >
            <BookCard margin="3rem auto" bookDetails={book} toshow={false} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default BooksCarousel;
