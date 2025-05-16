import React from "react";
import { Grid, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import { useQuery } from "@tanstack/react-query";
import ResourceURL from "../../constants/ResourceURL";
import BookCarousel from "../../components/BookCarousel";
import { IconAlertTriangle, IconMarquee } from "@tabler/icons-react";
import { BookResponse } from "../../models/Book";
import BookCardSkeleton from "../../components/BookCardSkeleton";

function ClientRecommendedForYou() {
  const theme = useMantineTheme();

  const {
    data: bookResponses,
    isLoading: isLoadingBookResponses,
    isError: isErrorBookResponses,
  } = useQuery<BookResponse[], ErrorMessage>({
    queryKey: ["client-api", "books", "getRecommendedBooks"],
    queryFn: () =>
      FetchUtils.getWithToken<BookResponse[]>(
        ResourceURL.RECOMMENDATION_BASE + "/for-you",
      ),
    refetchOnWindowFocus: false,
  });

  const books = bookResponses as BookResponse[];

  let resultFragment;

  if (isLoadingBookResponses) {
    resultFragment = (
      <Grid>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
              <BookCardSkeleton />
            </Grid.Col>
          ))}
      </Grid>
    );
  }

  if (isErrorBookResponses) {
    resultFragment = (
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

  if (books && books.length === 0) {
    resultFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.blue[6] }}
      >
        <IconMarquee size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          No books available at the moment
        </Text>
      </Stack>
    );
  }

  if (books && books.length > 0) {
    resultFragment = <BookCarousel books={books} />;
  }

  return (
    <Stack>
      <Title order={2}>
        <Text color="orange" inherit>
          Recommended For You
        </Text>
      </Title>

      {resultFragment}
    </Stack>
  );
}

export default ClientRecommendedForYou;
