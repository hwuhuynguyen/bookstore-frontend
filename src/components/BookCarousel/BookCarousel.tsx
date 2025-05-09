import { Carousel } from "@mantine/carousel";
import BookCard from "../BookCard";
import { BookResponse } from "../../models/Book";

interface BookCarouselProps {
  books: BookResponse[];
}
function BookCarousel({ books }: BookCarouselProps) {
  return (
    <>
      <Carousel
        withControls
        withIndicators
        loop
        slideSize={{ base: "100%", sm: "50%", md: "25%" }}
        slideGap={"sm"}
        align="start"
      >
        {books?.map((book) => (
          <Carousel.Slide
            style={{
              height: "100%",
              minHeight: 315,
            }}
          >
            <BookCard book={book} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}

export default BookCarousel;
