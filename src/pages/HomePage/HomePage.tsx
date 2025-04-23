import { Container, Title, Text, Group, Card, SimpleGrid, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Mock featured books
  const featuredBooks = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99 },
    { id: 2, title: '1984', author: 'George Orwell', price: 10.99 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 11.99 },
  ];

  return (
    <Container size="xl">
      <Title order={1} my="lg">Welcome to Our Bookstore</Title>
      <Text mb="xl">Discover a world of books at your fingertips.</Text>
      
      <Title order={2} my="lg">Featured Books</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {featuredBooks.map((book) => (
          <Card key={book.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3}>{book.title}</Title>
            <Text>{book.author}</Text>
            <Text fw={700}>${book.price}</Text>
            <Group mt="md">
              <Button component={Link} to={`/books/${book.id}`}>View Details</Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
      
      <Group justify="center" mt="xl">
        <Button size="lg" component={Link} to="/books">Browse All Books</Button>
      </Group>
    </Container>
  );
};

export default HomePage;