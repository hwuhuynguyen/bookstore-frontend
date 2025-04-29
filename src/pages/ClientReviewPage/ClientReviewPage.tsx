import { Card, ColorSwatch, Container, Grid, Group, Pagination, Skeleton, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import UserNavbar from "../../components/UserNavbar";
import { useState } from "react";
import ReviewCard from "../../components/ReviewCard";

function ClientReviewPage() {
  const theme = useMantineTheme()
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage]= useState(0)
  const reviews: any = [{}, {}, {}]

  let reviewContentFragment;

  if (isLoading) {
    reviewContentFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (reviews && reviews.length > 0) {
    reviewContentFragment = (
      <>
        <Stack gap="xs">
          {reviews.map((review:any) => <ReviewCard key={review.reviewId} review={review}/>)}
        </Stack>

        <Group justify="space-between" mt={theme.spacing.lg}>
          <Pagination
            total={100}
            onChange={(page: number) => (page !== activePage) && setActivePage(page)}
          />
          <Text>
            <Text component="span" >Page {activePage}</Text>
            <span> / {100}</span>
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
