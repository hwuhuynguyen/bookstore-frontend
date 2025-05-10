import React from "react";
import { Skeleton, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { useQuery } from "@tanstack/react-query";
import ResourceURL from "../../constants/ResourceURL";
import BookCarousel from "../../components/BookCarousel";
import { IconAlertTriangle, IconMarquee } from "@tabler/icons-react";
import { BookResponse } from "../../models/Book";

function ClientLatestBooks() {
  const theme = useMantineTheme();

  const requestParams = { size: 12, page: 0, sort: "publicationDate,desc" };

  const {
    data: bookResponses,
    isLoading: isLoadingBookResponses,
    isError: isErrorBookResponses,
  } = useQuery<ListResponse<BookResponse>, ErrorMessage>({
    queryKey: ["client-api", "books", "getAllBooks", requestParams],
    queryFn: () =>
      FetchUtils.get<ListResponse<BookResponse>>(
        ResourceURL.CLIENT_BOOK,
        requestParams
      ),
    refetchOnWindowFocus: false,
  });

  const books = bookResponses as ListResponse<BookResponse>;

  let resultFragment;

  if (isLoadingBookResponses) {
    resultFragment = (
      <Stack>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
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

  if (books && books.totalElements === 0) {
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

  if (books && books.totalElements > 0) {
    resultFragment = <BookCarousel books={books.data} />;
  }

  return (
    <Stack>
      <Title order={2}>
        <Text color="orange" inherit>
          Latest book
        </Text>
      </Title>

      {resultFragment}
    </Stack>
  );
}

export default ClientLatestBooks;
