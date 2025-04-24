import {
  Container,
  Title,
  Text,
  Group,
  Card,
  SimpleGrid,
  Button,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import HomeBanner from "../../components/HomeBanner";
import BookCarousel from "../../components/BookCarousel";

const HomePage = () => {
  // Mock featured books
  const featuredBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 12.99,
    },
    { id: 2, title: "1984", author: "George Orwell", price: 10.99 },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 11.99,
    },
  ];
  const theme = useMantineTheme();
  return (
    <main>
      <Container size="xl">
        <Stack gap={theme.spacing.lg}>
          <HomeBanner />

          <BookCarousel />
          <BookCarousel />
          <BookCarousel />

          {/* <ClientHomeBanner/>
        <ClientHomeFeaturedCategories/>
        <ClientHomeLatestProducts/>
        <ClientHomeNewsletter/> */}
        </Stack>
      </Container>
    </main>
  );
};

export default HomePage;
