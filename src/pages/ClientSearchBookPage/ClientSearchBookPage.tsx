import {
  Button,
  Center,
  Checkbox,
  Chip,
  Container,
  Grid,
  Group,
  Pagination,
  Radio,
  Rating,
  Skeleton,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconArrowsDownUp,
  IconChartCandle,
  IconMarquee,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { BookResponse } from "../../models/Book";
import ResourceURL from "../../constants/ResourceURL";
import BookCard from "../../components/BookCard";
import useClientSearchBook from "../../stores/ClientSearchBookStore";
import { useDebouncedValue } from "@mantine/hooks";
import { CategoryResponse } from "../../models/Category";
import BookCardSkeleton from "../../components/BookCardSkeleton";
import NumberUtils from "../../utils/NumberUtils";
import ApplicationConstants from "../../constants/ApplicationConstants";

function ClientSearchBookPage() {
  const theme = useMantineTheme();

  const {
    activePage,
    activeSort,
    activeSearch,
    activePriceFilter,
    activeCategoryFilter,
    activeRatingFilter,
    activeSourceFilter,
    updateActivePage,
    updateActiveSort,
    updateActiveSearch,
    updateActivePriceFilter,
    updateActiveCategoryFilter,
    updateActiveRatingFilter,
    updateActiveSourceFilter,
    resetClientSearchBookState,
  } = useClientSearchBook();

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);
  useEffect(() => {
    if (debouncedSearchQuery !== activeSearch) {
      updateActivePage(1);
      updateActiveSearch(debouncedSearchQuery);
    }
  }, [
    activeSearch,
    debouncedSearchQuery,
    updateActivePage,
    updateActiveSearch,
  ]);

  useEffect(() => {
    // On mount or when store updates
    setSelectedPrice(activePriceFilter);
  }, [activePriceFilter]);

  useEffect(() => {
    // On mount or when store updates
    setCategoryOptions(activeCategoryFilter);
  }, [activeCategoryFilter]);

  useEffect(() => {
    // On mount or when store updates
    setSelectedRating(activeRatingFilter);
  }, [activeRatingFilter]);

  useEffect(() => {
    // On mount or when store updates
    setSelectedSource(activeSourceFilter);
  }, [activeSourceFilter]);

  const categoryFilter =
    categoryOptions.length > 0 ? `category:${categoryOptions.join("|")}` : null;
  const priceFilter = selectedPrice ? `price:${selectedPrice}` : null;
  const ratingFilter = selectedRating ? `rating:${selectedRating}` : null;
  const sourceFilter = selectedSource ? `source:${selectedSource}` : null;

  const filterParts = [categoryFilter, priceFilter, ratingFilter, sourceFilter].filter(
    Boolean
  );
  const filter = filterParts.length > 0 ? filterParts.join(",") : null;

  const requestParams = {
    size: 12,
    page: activePage - 1,
    sort: activeSort,
    search: debouncedSearchQuery || null,
    filter,
  };

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

  const categoryRequestParams = {
    size: 100,
    page: 0,
    sort: "name,asc",
  };

  const {
    data: categoryResponses,
    isLoading: isLoadingCategoryResponses,
    isError: isErrorCategoryResponses,
  } = useQuery<ListResponse<CategoryResponse>, ErrorMessage>({
    queryKey: [
      "client-api",
      "categories",
      "getAllCategories",
      categoryRequestParams,
    ],
    queryFn: () =>
      FetchUtils.get<ListResponse<CategoryResponse>>(
        ResourceURL.CLIENT_CATEGORY,
        categoryRequestParams
      ),
    refetchOnWindowFocus: false,
  });

  const books = bookResponses as ListResponse<BookResponse>;

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
    updateActivePriceFilter(value);
  };

  const handleCategoryChips = (categoryIds: string[]) => {
    setCategoryOptions(categoryIds);
    updateActiveCategoryFilter(categoryIds);
  };

  const disabledResetButton =
    activePage === 1 &&
    activePriceFilter === null &&
    activeCategoryFilter.length === 0 &&
    activeRatingFilter === null &&
    activeSourceFilter === null &&
    activeSort === null &&
    searchQuery === null;

  const handleResetButton = () => {
    resetClientSearchBookState();
    setSearchQuery(null);
    setSelectedPrice(null);
    setCategoryOptions([]);
  };

  let resultFragment;

  if (isLoadingBookResponses) {
    resultFragment = (
      <Grid>
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
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

  if (books && books.totalElements === 0) {
    resultFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.blue[6] }}
      >
        <IconMarquee size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          No books found
        </Text>
      </Stack>
    );
  }

  if (books && books.totalElements > 0) {
    resultFragment = (
      <>
        <Group justify="center" mt={theme.spacing.lg}>
          <Pagination
            value={activePage}
            total={books.totalPages}
            onChange={(page: number) =>
              page !== activePage && updateActivePage(page)
            }
          />
        </Group>
        <Grid mt={theme.spacing.xs}>
          {books.data.map((book, index) => (
            <Grid.Col key={index} span={{ base: 6, sm: 4 }}>
              <BookCard book={book} />
            </Grid.Col>
          ))}
        </Grid>

        <Group justify="center" mt={theme.spacing.lg}>
          <Pagination
            value={activePage}
            total={books.totalPages}
            onChange={(page: number) =>
              page !== activePage && updateActivePage(page)
            }
          />
        </Group>
        <Center>
          <Text component="span">
            Page {activePage} / {books.totalPages}
          </Text>
        </Center>
      </>
    );
  }
  return (
    <main>
      <Container size="xl">
        <Stack gap={theme.spacing.xl}>
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 3 }} mb={theme.spacing.xl}>
              <Stack gap="lg">
                <Group justify="space-between">
                  <Group gap="xs">
                    <IconChartCandle />
                    <Text fw={500}>Filter</Text>
                  </Group>
                  <Button
                    variant="light"
                    color="pink"
                    radius="md"
                    size="xs"
                    leftSection={<IconX size={14} />}
                    onClick={handleResetButton}
                    disabled={disabledResetButton}
                  >
                    Set as default
                  </Button>
                </Group>

                <Stack>
                  <Text fw={500}>Search</Text>
                  <TextInput
                    radius="md"
                    placeholder={"What are you looking for... "}
                    leftSection={<IconSearch size={16} />}
                    value={searchQuery || ""}
                    onChange={(event) =>
                      setSearchQuery(event.currentTarget.value || null)
                    }
                  />
                </Stack>

                <Stack>
                  <Text fw={500}>Price</Text>
                  <Radio.Group
                    value={selectedPrice}
                    onChange={handlePriceChange}
                    name="price-filter"
                  >
                    <Group>
                      {NumberUtils.generatePriceOptions(
                        ApplicationConstants.BOOK_PRICE_OPTIONS
                      ).map((priceOption, index) => {
                        const value =
                          priceOption[1] === null
                            ? `${priceOption[0]}-`
                            : priceOption.join("-");
                        return (
                          <Radio
                            key={index}
                            value={value}
                            label={NumberUtils.readablePriceOption(priceOption)}
                          />
                        );
                      })}
                    </Group>
                  </Radio.Group>
                </Stack>

                <Stack>
                  <Text fw={500}>Category</Text>
                  {isLoadingCategoryResponses ? (
                    <Skeleton height={50} />
                  ) : isErrorCategoryResponses ? (
                    <Text color="red">Error occurred while fetching data</Text>
                  ) : (
                    <Group gap="xs" wrap="wrap">
                      {categoryResponses?.data &&
                      categoryResponses?.data?.length > 0 ? (
                        <Chip.Group
                          multiple
                          value={categoryOptions}
                          onChange={handleCategoryChips}
                        >
                          {categoryResponses?.data.map((category) => (
                            <Chip key={category.id} value={category.name}>
                              {category.name}
                            </Chip>
                          ))}
                        </Chip.Group>
                      ) : (
                        <Text style={{ fontStyle: "italic" }} color="dimmed">
                          No options
                        </Text>
                      )}
                    </Group>
                  )}
                </Stack>

                <Stack>
                  <Text fw={500}>Customer rating</Text>
                  <Radio.Group
                    name="rating-filter"
                    value={selectedRating}
                    onChange={(value) => {
                      setSelectedRating(value);
                      updateActiveRatingFilter(value);
                    }}
                  >
                    <Stack gap="xs">
                      {ApplicationConstants.BOOK_RATING_OPTIONS.map(
                        (rating) => (
                          <Radio
                            key={rating}
                            value={rating}
                            label={
                              <Group gap="xs">
                                <Rating value={parseInt(rating)} readOnly />
                                <Text size="sm" c="dimmed">
                                  {rating} stars & up
                                </Text>
                              </Group>
                            }
                          />
                        )
                      )}
                    </Stack>
                  </Radio.Group>
                </Stack>

                <Stack>
                  <Text fw={500}>Source</Text>
                  <Radio.Group
                    name="source-filter"
                    value={selectedSource}
                    onChange={(value) => {
                      setSelectedSource(value);
                      updateActiveSourceFilter(value);
                    }}
                  >
                    <Stack gap="xs">
                      {ApplicationConstants.BOOK_SOURCE_OPTIONS.map(
                        (source) => (
                          <Radio
                            key={source.value}
                            value={source.value}
                            label={source.label}
                          />
                        )
                      )}
                    </Stack>
                  </Radio.Group>
                </Stack>

                <Stack>
                  <Text fw={500}>Other</Text>
                  <Checkbox
                    label="Only in stock"
                    checked={true}
                    onChange={() => console.log()}
                  />
                </Stack>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 9 }}>
              <Stack gap="lg">
                <Group justify="space-between">
                  <Group gap="xs">
                    <IconArrowsDownUp size={20} />
                    <Text fw={500} mr={theme.spacing.xs}>
                      Sorted by
                    </Text>
                    <Radio.Group
                      value={activeSort || ""}
                      onChange={(value) =>
                        updateActiveSort(
                          (value as
                            | "publicationDate,desc"
                            | "averageRating,desc"
                            | "price,asc"
                            | "price,desc") || null
                        )
                      }
                    >
                      <Group>
                        <Radio value="publicationDate,desc" label="New" />
                        <Radio value="averageRating,desc" label="Featured" />
                        {/* <Radio value="price,desc" label="Bestsellers" /> */}
                        <Radio value="price,asc" label="Price low to high" />
                        <Radio value="price,desc" label="Price high to low" />
                      </Group>
                    </Radio.Group>
                  </Group>
                </Group>
                {resultFragment}
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </main>
  );
}

export default ClientSearchBookPage;
