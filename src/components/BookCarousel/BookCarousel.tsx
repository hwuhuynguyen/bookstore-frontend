import { Carousel } from "@mantine/carousel";
import { Badge, Button, Card, Group, Image, Text, Title } from "@mantine/core";
import BookCard from "../BookCard";

function BookCarousel() {
  const featuredBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 12.99,
    },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 11.99,
    },
  ];
  return (
    <>
      <Title order={2}>
        <Text color="orange" inherit>
          Recommended for you
        </Text>
      </Title>
      <Carousel
        withControls
        withIndicators
        loop
        slideSize={{ base: "100%", sm: "50%", md: "25%" }}
        slideGap={"sm"}
        align="start"
      >
        {featuredBooks.map((book) => (
          <Carousel.Slide
            style={{
              height: "100%",
              minHeight: 315,
            }}
          >
            <BookCard />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}

export default BookCarousel;
