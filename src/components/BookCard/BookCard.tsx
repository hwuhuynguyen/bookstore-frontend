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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddToCartRequest, CartResponse } from "../../models/Cart";
import ResourceURL from "../../constants/ResourceURL";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import useAuthStore from "../../stores/AuthStore";
import NotifyUtils from "../../utils/NotifyUtils";

interface BookCardProps {
  book: BookResponse;
}

function BookCard({ book }: BookCardProps) {
  const queryClient = useQueryClient();
  const { user, updateCurrentTotalCartItems } = useAuthStore();
  const addQuantityMutation = useMutation<
    CartResponse,
    ErrorMessage,
    AddToCartRequest
  >({
    mutationFn: ({ bookId, quantity }: AddToCartRequest) =>
      FetchUtils.postWithToken(`${ResourceURL.CLIENT_CART}/items`, {
        bookId,
        quantity,
      }),
    onSuccess: (response: CartResponse) => {
      const totalItems = response.cartItems?.length;
      updateCurrentTotalCartItems(totalItems);
      queryClient.invalidateQueries({
        queryKey: ["client-api", "carts", "getCart"],
      });
    },
  });

  const handleAddToCart = () => {
    if (user) {
      addQuantityMutation.mutate({ bookId: book.id, quantity: 1 });
    } else {
      NotifyUtils.simpleFailed("Please log in to continue with this action.")
    }
  };
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={book?.imageUrl || ApplicationConstants.DEFAULT_THUMBNAIL_URL}
            style={{
              height: 200,
            }}
            alt={book?.title}
            onError={(e) => {
              e.currentTarget.src = ApplicationConstants.DEFAULT_THUMBNAIL_URL;
            }}
          />
        </Card.Section>

        <Group justify="space-between" mt="md" wrap="nowrap">
          <Tooltip label={book?.title} withArrow position="top">
            <Text fw={500} lineClamp={1}>
              {book?.title}
            </Text>
          </Tooltip>
        </Group>
        <Group justify="space-between">
          <Text fw={700} size="lg" c="pink" mb="4px">
            {(book?.price || 0).toLocaleString("vi-VN")}đ
          </Text>
          {book.inventory !== 0 ? (
            <Badge color="blue" variant="filled" mb="4px">
              In stock
            </Badge>
          ) : (
            <Badge color="red" variant="filled" mb="4px">
              Out of stock
            </Badge>
          )}
        </Group>
        <Text size="sm" c="dimmed" lineClamp={3} style={{ minHeight: "4.5em" }}>
          {book?.description}
        </Text>

        <Grid>
          <Grid.Col span={{ base: 9 }}>
            <Tooltip label="View details" withArrow position="top">
              <Link
                to={`/books/${book?.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Button color="blue" fullWidth mt="sm" radius="md">
                  View details
                </Button>
              </Link>
            </Tooltip>
          </Grid.Col>
          <Grid.Col span={{ base: 3 }}>
            <Tooltip label="Add to cart" withArrow position="top">
              <Button
                color="cyan"
                fullWidth
                mt="sm"
                radius="md"
                disabled={book.inventory === 0}
                onClick={handleAddToCart}
              >
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
