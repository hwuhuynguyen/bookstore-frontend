import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Text,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

function BookCard() {
  const book = {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
  };
  return (
    <>
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
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>

        <Grid>
          <Grid.Col span={{base: 9}}>
            <Button color="blue" fullWidth mt="sm" radius="md">
              View details
            </Button>
          </Grid.Col>
          <Grid.Col span={{base: 3}}>
            <Button color="cyan" fullWidth mt="sm" radius="md">
              <IconShoppingCart size={24}/>
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}

export default BookCard;
