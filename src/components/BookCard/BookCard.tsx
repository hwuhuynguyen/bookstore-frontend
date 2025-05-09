import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { BookResponse } from "../../models/Book";
import ApplicationConstants from "../../constants/ApplicationConstants";

interface BookCardProps {
  book: BookResponse;
}

function BookCard({ book }: BookCardProps) {
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={book.imageUrl || ApplicationConstants.DEFAULT_THUMBNAIL_URL}
            height={160}
            style={{
              maxHeight: 200,
            }}
            alt="Norway"
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs" wrap="nowrap">
          <Tooltip label={book.title} withArrow position="top">
            <Text fw={500} lineClamp={1}>
              {book.title}
            </Text>
          </Tooltip>
          <Badge color="pink">{book.price}</Badge>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {book.description}
        </Text>

        <Grid>
          <Grid.Col span={{ base: 9 }}>
            <Tooltip label="View details" withArrow position="top">
              <Link to={`/books/${book.id}`} style={{ textDecoration: "none" }}>
                <Button color="blue" fullWidth mt="sm" radius="md">
                  View details
                </Button>
              </Link>
            </Tooltip>
          </Grid.Col>
          <Grid.Col span={{ base: 3 }}>
            <Tooltip label="Add to cart" withArrow position="top">
              <Button color="cyan" fullWidth mt="sm" radius="md">
                <IconShoppingCart size={24} />
              </Button>
            </Tooltip>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
}

export default BookCard;
