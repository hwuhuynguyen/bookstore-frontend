import { Carousel } from "@mantine/carousel";
import { Badge, Button, Card, Group, Image, Text, Title } from "@mantine/core";

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
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{book.title}</Text>
                <Badge color="pink">{book.price}</Badge>
              </Group>

              <Text size="sm" c="dimmed">
                With Fjord Tours you can explore more of the magical fjord
                landscapes with tours and activities on and around the fjords of
                Norway
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                View details
              </Button>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}

export default BookCarousel;
