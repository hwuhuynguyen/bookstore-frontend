import {
  Grid,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconAlertTriangle, IconMarquee } from "@tabler/icons-react";
import BookCard from "../BookCard";

function BookGrid() {
  const theme = useMantineTheme();
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

  const isLoadingProductResponses = false;
  const isErrorProductResponses = false;
  if (isLoadingProductResponses) {
    return (
      <Stack>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (isErrorProductResponses) {
    return (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.pink[6] }}
      >
        <IconAlertTriangle size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          Đã có lỗi xảy ra
        </Text>
      </Stack>
    );
  }

  if (false) {
    return (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.blue[6] }}
      >
        <IconMarquee size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          Không có sản phẩm
        </Text>
      </Stack>
    );
  }

  return (
    <>
      <Grid>
        {featuredBooks.map((book, index) => (
            <Grid.Col key={index} span={{base: 12, sm: 4}} >
              <BookCard />
            </Grid.Col>
          ))}
      </Grid>

      <Group justify="space-evenly" mt={theme.spacing.lg}>
        <Pagination total={100} onChange={(page: number) => console.log()} />
        <Text>
          <Text component="span" fw={500}>
            Page 1
          </Text>
          <span> / {100}</span>
        </Text>
      </Group>
    </>
  );
}

export default BookGrid;
