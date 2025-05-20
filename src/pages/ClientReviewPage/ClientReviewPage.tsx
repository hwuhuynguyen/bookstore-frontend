import { Card, Container, Grid, Group, Pagination, Skeleton, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import UserNavbar from "../../components/UserNavbar";
import { useState } from "react";
import ReviewCard from "../../components/ReviewCard";
import { useQuery } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { ReviewResponse } from "../../models/Review";
import ResourceURL from "../../constants/ResourceURL";
import { IconAlertTriangle, IconMoodAnnoyed } from "@tabler/icons-react";

function ClientReviewPage() {
  const theme = useMantineTheme();
  const [activePage, setActivePage] = useState(1);

  const requestParams = {
    size: 5,
    page: activePage - 1,
    sort: "updatedAt,desc",
  };

  const {
    data: reviewResponses,
    isLoading: isLoadingReviewResponses,
    isError: isErrorReviewResponses,
  } = useQuery<ListResponse<ReviewResponse>, ErrorMessage>({
    queryKey: ["client-api", "reviews", "getMyReviews", requestParams],
    queryFn: () =>
      FetchUtils.getWithToken<ListResponse<ReviewResponse>>(
        ResourceURL.CLIENT_GET_MY_REVIEWS,
        requestParams
      ),
    refetchOnWindowFocus: false,
  });

  const reviews = reviewResponses as ListResponse<ReviewResponse>;

  let reviewContentFragment;

  if (isLoadingReviewResponses) {
    reviewContentFragment = (
      <Stack>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (isErrorReviewResponses) {
    reviewContentFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.pink[6] }}
      >
        <IconAlertTriangle size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          Error occurred while fetching data
        </Text>
      </Stack>
    );
  }

  if (reviews && reviews.totalElements === 0) {
    reviewContentFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.blue[5] }}
      >
        <IconMoodAnnoyed size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          No review yet
        </Text>
      </Stack>
    );
  }

  if (reviews && reviews.totalElements > 0) {
    reviewContentFragment = (
      <>
        <Stack gap="xs">
          {reviews?.data?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Stack>
        <Group justify="space-between" mt={theme.spacing.lg}>
          <Pagination
            value={activePage}
            total={reviews.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text component="span">
            Page {activePage} / {reviews.totalPages}
          </Text>
        </Group>
      </>
    );
  }
  
  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 2, sm: 1, md: 3 }}>
            <UserNavbar />
          </Grid.Col>

          <Grid.Col span={{ base: 10, sm: 11, md: 9 }}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>Reviews</Title>

                {reviewContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientReviewPage;
