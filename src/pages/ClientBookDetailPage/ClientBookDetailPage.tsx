import { useState } from "react";
import {
  Grid,
  Image,
  Text,
  Group,
  Badge,
  Rating,
  Tabs,
  Button,
  Box,
  Avatar,
  Table,
  ActionIcon,
  Container,
  Paper,
  Stack,
  useMantineTheme,
  Progress,
  Flex,
  Divider,
  Skeleton,
  AvatarGroup,
  Textarea,
  Pagination,
} from "@mantine/core";
import {
  IconHeart,
  IconMinus,
  IconPlus,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import { BookResponse } from "../../models/Book";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ResourceURL from "../../constants/ResourceURL";
import ErrorFetchingPage from "../ErrorFetchingPage";
import ApplicationConstants from "../../constants/ApplicationConstants";
import { AddToCartRequest, CartResponse } from "../../models/Cart";
import useAuthStore from "../../stores/AuthStore";
import NotifyUtils from "../../utils/NotifyUtils";
import ClientRelatedBooks from "./ClientRelatedBooks";
import DateUtils from "../../utils/DateUtils";
import { WishlistRequest } from "../../models/Wishlist";
import {
  RatingDistributionItem,
  ReviewPageWrapper,
  ReviewResponse,
} from "../../models/Review";

export default function ClientBookDetailPage() {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("details");
  const { user, updateCurrentTotalCartItems } = useAuthStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activePage, setActivePage] = useState(1);

  const { id } = useParams();
  const { bookResponse, isLoadingBookResponse, isErrorBookResponse } =
    useGetBookApi(id as string);
  const book = bookResponse as BookResponse;

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
      addQuantityMutation.mutate({ bookId: book.id, quantity });
      NotifyUtils.simpleSuccess("This book is added to cart successfully.");
    } else {
      NotifyUtils.simple("Please log in to continue with this action.");
    }
  };

  const addWishlistMutation = useMutation<
    CartResponse,
    ErrorMessage,
    AddToCartRequest
  >({
    mutationFn: ({ bookId }: WishlistRequest) =>
      FetchUtils.postWithToken(`${ResourceURL.WISHLIST_BASE}`, {
        bookId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-api", "wishlist", "getWishlist"],
      });
    },
  });

  const handleAddToWishlist = () => {
    if (user) {
      addWishlistMutation.mutate({ bookId: book.id, quantity });
      NotifyUtils.simpleSuccess("This book is added to wishlist successfully.");
    } else {
      NotifyUtils.simple("Please log in to continue with this action.");
    }
  };

  const reviewRequestParams = {
    size: 5,
    page: activePage - 1,
    sort: "updatedAt,desc",
  };

  const { data: reviewPage, refetch: refetchReviews } = useQuery<
    ReviewPageWrapper,
    ErrorMessage
  >({
    queryKey: ["reviews", book?.id, reviewRequestParams],
    queryFn: () =>
      FetchUtils.get<ReviewPageWrapper>(
        `${ResourceURL.REVIEW_BASE}/book/${book?.id}`,
        reviewRequestParams
      ),
    enabled: !!book,
  });

  const reviewMutation = useMutation({
    mutationFn: () =>
      FetchUtils.postWithToken(`${ResourceURL.REVIEW_BASE}`, {
        bookId: book?.id,
        rating,
        comment,
      }),
    onSuccess: () => {
      NotifyUtils.simpleSuccess("Your review was submitted successfully!");
      setRating(0);
      setComment("");
      refetchReviews();
      queryClient.invalidateQueries({
        queryKey: ["client-api", "books", "getBook", id],
      });
    },
  });

  if (isLoadingBookResponse) {
    return <ClientBookSkeleton />;
  }

  if (isErrorBookResponse) {
    return <ErrorFetchingPage />;
  }

  return (
    <Container size="xl">
      <Stack gap={theme.spacing.lg}>
        <Grid>
          {/* Left column with book image */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box style={{ maxWidth: 300, margin: "0 auto" }}>
              <Image
                src={
                  book.imageUrl || ApplicationConstants.DEFAULT_THUMBNAIL_URL
                }
                radius="md"
                fit="contain"
                alt={book.title}
                onError={(e) => {
                  e.currentTarget.src =
                    ApplicationConstants.DEFAULT_THUMBNAIL_URL;
                }}
              />
              <Button fullWidth variant="outline" color="gray" mt="md">
                Preview
              </Button>
            </Box>
          </Grid.Col>

          {/* Right column with book details */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Text fz={{ base: 24, sm: 28 }} fw={700} mb="xs">
              {book?.title}
            </Text>

            <Group gap="xs" mb="md">
              <Rating
                value={book?.averageRating || 0}
                fractions={10}
                readOnly
              />
              <Text size="sm" c="dimmed">
                {book?.averageRating.toFixed(2) || "0.00"}/{"5.00"}
              </Text>
              <Badge color="cyan" variant="outline">
                {book?.ratingCount || 0} rates
              </Badge>
              <Badge color="cyan" variant="outline">
                {book?.reviewCount || 0} reviews
              </Badge>
            </Group>

            <Group mb="md" align="center">
              <AvatarGroup>
                {book?.authors.map((author) => (
                  <Avatar
                    key={author.name}
                    name={author.name}
                    radius="xl"
                    size="md"
                  />
                ))}
              </AvatarGroup>
              <Box>
                <Text size="xs" c="dimmed">
                  Author
                </Text>
                <Text>
                  {book?.authors?.length
                    ? book.authors.map((author) => author.name).join(", ")
                    : "N/A"}
                </Text>
              </Box>
              <Box ml="xl">
                <Text size="xs" c="dimmed">
                  Publisher
                </Text>
                <Text>{book?.publisher || "N/A"}</Text>
              </Box>
              <Box ml="xl">
                <Text size="xs" c="dimmed">
                  Publication year
                </Text>
                <Text>
                  {DateUtils.convertTimestampToDate(book?.publicationDate) ||
                    "N/A"}
                </Text>
              </Box>
            </Group>

            <Text mb="lg" size="md" c="dimmed">
              {book?.description}
            </Text>

            <Stack mb="md">
              <Group>
                <Text fz={{ base: 24, sm: 28 }} fw={700}>
                  {(book.price || 0).toLocaleString("vi-VN")}đ
                </Text>
              </Group>

              <Group>
                <ActionIcon
                  variant="filled"
                  color="cyan"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  <IconMinus size={16} />
                </ActionIcon>
                <Text>{quantity}</Text>
                <ActionIcon
                  variant="filled"
                  color="cyan"
                  onClick={() =>
                    setQuantity(Math.min(book?.inventory || 0, quantity + 1))
                  }
                  disabled={book?.inventory === quantity}
                >
                  <IconPlus size={16} />
                </ActionIcon>
                <Text size="sm" c="dimmed">
                  Books in stock: {book?.inventory || 0}
                </Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Tabs
              value={activeTab}
              onChange={(value) => value && setActiveTab(value)}
              mb="xl"
              px={16}
            >
              <Tabs.List grow>
                <Tabs.Tab
                  value="details"
                  style={{
                    fontSize: "1rem",
                    fontWeight: activeTab === "details" ? "500" : "normal",
                  }}
                >
                  Details
                </Tabs.Tab>
                <Tabs.Tab
                  value="reviews"
                  style={{
                    fontSize: "1rem",
                    fontWeight: activeTab === "reviews" ? "500" : "normal",
                  }}
                >
                  Reviews
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="details" pt="md">
                <Table
                  highlightOnHover={false}
                  verticalSpacing="xs"
                  variant="vertical"
                >
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Th w={250}>Publication date</Table.Th>
                      <Table.Td>
                        {DateUtils.convertTimestampToDate(
                          book.publicationDate
                        ) || "N/A"}
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>ISBN</Table.Th>
                      <Table.Td>{book.isbn}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Number of pages</Table.Th>
                      <Table.Td>
                        {book.numberOfPages
                          ? book.numberOfPages + " pages"
                          : "N/A"}
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Publisher</Table.Th>
                      <Table.Td>{book.publisher || "N/A"}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Author</Table.Th>
                      <Table.Td>
                        {book?.authors.map((author) => author.name).join(", ")}
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Book cover</Table.Th>
                      <Table.Td>{book.bookCover || "N/A"}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Source</Table.Th>
                      <Table.Td>{book?.source?.name || "N/A"}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Category</Table.Th>
                      <Table.Td>
                        {book?.categories && book.categories.length > 0
                          ? book.categories.map((category) => (
                              <Badge key={category.id} color="cyan" mr={4}>
                                {category.name}
                              </Badge>
                            ))
                          : "N/A"}
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Tabs.Panel>

              <Tabs.Panel value="reviews" pt="md">
                <Box>
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    gap="xl"
                    align="flex-start"
                    wrap="wrap"
                  >
                    {/* Left side - Rating summary */}
                    <Box style={{ flex: 1, minWidth: 300 }}>
                      <Group align="flex-end" mb="sm">
                        <Text fz={36} fw={700} lh={1}>
                          {book?.averageRating.toFixed(2)}
                        </Text>
                        <Box>
                          <Rating
                            value={book?.averageRating}
                            fractions={2}
                            readOnly
                            size="md"
                          />
                          <Text fz="sm" c="dimmed">
                            {book?.reviewCount} reviews
                          </Text>
                        </Box>
                      </Group>

                      <Stack gap="xs" mb="md">
                        {reviewPage?.ratingDistribution.map(
                          (item: RatingDistributionItem) => (
                            <Group key={item.stars} gap="xs">
                              <Text fz="sm" w={35}>
                                {item.stars} star
                              </Text>
                              <Progress
                                value={
                                  (item.count /
                                    reviewPage.pageData.totalElements) *
                                  100
                                }
                                size="sm"
                                style={{ flex: 1 }}
                                color={
                                  item.stars >= 4
                                    ? "yellow"
                                    : item.stars >= 3
                                    ? "blue"
                                    : "gray"
                                }
                              />
                              <Text fz="sm" w={20} ta="right">
                                {item.count}
                              </Text>
                            </Group>
                          )
                        )}
                      </Stack>

                      <Group gap="xs">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <Button
                            key={stars}
                            variant="outline"
                            size="xs"
                            radius="xl"
                            styles={{
                              root: {
                                borderColor: "var(--mantine-color-gray-3)",
                                color: "var(--mantine-color-dark-6)",
                              },
                            }}
                          >
                            {stars} star
                          </Button>
                        ))}
                      </Group>
                    </Box>

                    {/* Right side - Review form */}
                    <Box style={{ flex: 1, minWidth: 300 }}>
                      {user ? (
                        <>
                          <Text fw={500} mb="xs">
                            Write a review
                          </Text>
                          <Stack gap="sm">
                            <Rating value={rating} onChange={setRating} />
                            <Textarea
                              placeholder="Your thoughts about this book"
                              value={comment}
                              onChange={(event) =>
                                setComment(event.currentTarget.value)
                              }
                            />
                            <Button
                              onClick={() => {
                                if (rating === 0) {
                                  NotifyUtils.simple("Please rate the book");
                                  return;
                                }
                                if (comment.trim().length == 0) {
                                  NotifyUtils.simple("Please leave a review");
                                  return;
                                }
                                reviewMutation.mutate();
                              }}
                            >
                              Leave a review
                            </Button>
                          </Stack>
                        </>
                      ) : (
                        <Text c="dimmed">Please log in to leave a review.</Text>
                      )}
                    </Box>
                  </Flex>

                  <Divider my="lg" />

                  {/* Reviews list */}
                  <Stack gap="md">
                    {reviewPage?.pageData.data.map((review: ReviewResponse) => (
                      <Paper key={review.id} p="md" withBorder>
                        <Group mb="xs">
                          <Avatar
                            key={
                              review.user.firstName + " " + review.user.lastName
                            }
                            name={
                              review.user.firstName + " " + review.user.lastName
                            }
                            radius="xl"
                            size="md"
                          />

                          <Box>
                            <Text fw={500}>
                              {review.user.firstName +
                                " " +
                                review.user.lastName}
                            </Text>
                            <Group gap={4}>
                              <Rating
                                value={review.rating}
                                readOnly
                                size="xs"
                              />
                              <Text fz="xs" c="dimmed">
                                {DateUtils.convertTimestampToUTC(
                                  review.updatedAt
                                )}
                              </Text>
                            </Group>
                          </Box>
                        </Group>
                        <Text fz="sm" c="dimmed">
                          {review.comment}
                        </Text>
                      </Paper>
                    ))}
                    {reviewPage && (
                      <Pagination
                        value={activePage}
                        total={reviewPage.pageData.totalPages}
                        onChange={(page: number) =>
                          page !== activePage && setActivePage(page)
                        }
                      />
                    )}
                  </Stack>
                </Box>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }} px={16}>
            <Paper shadow="xs" p="md" withBorder>
              <Text fw={700} size="lg" mb="md" style={{ textAlign: "center" }}>
                Purchase Item
              </Text>

              <Table>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>Price per unit</Table.Td>
                    <Table.Td>
                      {(book.price || 0).toLocaleString("vi-VN")}đ
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Quantity</Table.Td>
                    <Table.Td>{quantity}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <Text fw={700}>Total amount</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={700}>
                        {(book.price * quantity || 0).toLocaleString("vi-VN")}đ
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>

              <Button
                fullWidth
                color="cyan"
                leftSection={<IconShoppingCart size={18} />}
                mt="md"
                radius="md"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
              <Button
                fullWidth
                variant="outline"
                color="red"
                leftSection={<IconHeart size={18} />}
                mt="sm"
                radius="md"
                onClick={handleAddToWishlist}
              >
                Add to wishlist
              </Button>
            </Paper>
          </Grid.Col>
        </Grid>
        <ClientRelatedBooks book={book} />
      </Stack>
    </Container>
  );
}

function ClientBookSkeleton() {
  return (
    <main>
      <Container size="xl">
        <Stack>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} height={50} radius="md" />
            ))}
        </Stack>
      </Container>
    </main>
  );
}

function useGetBookApi(bookId: string) {
  const {
    data: bookResponse,
    isLoading: isLoadingBookResponse,
    isError: isErrorBookResponse,
  } = useQuery<BookResponse, ErrorMessage>({
    queryKey: ["client-api", "books", "getBook", bookId],
    queryFn: () => FetchUtils.get(ResourceURL.CLIENT_BOOK + "/" + bookId),
    refetchOnWindowFocus: false,
  });

  return { bookResponse, isLoadingBookResponse, isErrorBookResponse };
}
