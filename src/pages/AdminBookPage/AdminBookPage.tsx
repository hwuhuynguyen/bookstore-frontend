import {
  Title,
  Table,
  Group,
  Button,
  TextInput,
  ActionIcon,
  Modal,
  Textarea,
  NumberInput,
  Card,
  Stack,
  Pagination,
  Text,
  useMantineTheme,
  Skeleton,
  Tooltip,
  Grid,
  MultiSelect,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  IconSearch,
  IconPlus,
  IconAlertTriangle,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { BookRequest, BookResponse } from "../../models/Book";
import ResourceURL from "../../constants/ResourceURL";
import NumberUtils from "../../utils/NumberUtils";
import DateUtils from "../../utils/DateUtils";
import NotifyUtils from "../../utils/NotifyUtils";
import { CategoryResponse } from "../../models/Category";
import { DateInput } from "@mantine/dates";
import { AuthorResponse } from "../../models/Author";
import { useDebouncedValue } from "@mantine/hooks";

const AdminBookPage = () => {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookResponse | null>(null); // Selected book for update
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "view"
  );
  const [authorSearch, setAuthorSearch] = useState("");
  const [authorOptions, setAuthorOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  const fetchAuthors = async (query: string) => {
    try {
      const params = { search: query, size: 20, page: 0 };
      const response = await FetchUtils.getWithToken<
        ListResponse<AuthorResponse>
      >(`${ResourceURL.AUTHOR_BASE}/all`, params, true);
      const options =
        response.data.map((a) => ({
          value: a.id,
          label: a.name,
        })) || [];

      setAuthorOptions(options);
    } catch (error: any) {
      setAuthorOptions([]);
      console.log(error);
    }
  };

  // debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (authorSearch.length > 2) fetchAuthors(authorSearch);
      else setAuthorOptions([]);
    }, 300);

    return () => clearTimeout(handler);
  }, [authorSearch]);

  useEffect(() => {
    // Ensure all selected authors are in authorOptions
    const extraOptions = selectedBook?.authors
      .filter((a) => !authorOptions.find((opt) => opt.value === a.id))
      .map((a) => ({ value: a.id, label: a.name }));

    if (extraOptions && extraOptions.length > 0) {
      setAuthorOptions((prev) => [...prev, ...extraOptions]);
    }
  }, [selectedBook?.authors, authorOptions]);

  const categoryRequestParams = {
    size: 100,
    page: 0,
    sort: "name,asc",
  };

  const { data: categoryResponses } = useQuery<
    ListResponse<CategoryResponse>,
    ErrorMessage
  >({
    queryKey: [
      "client-api",
      "categories",
      "getAllCategories",
      categoryRequestParams,
    ],
    queryFn: () =>
      FetchUtils.get<ListResponse<CategoryResponse>>(
        `${ResourceURL.CLIENT_CATEGORY}`,
        requestParams
      ),
    refetchOnWindowFocus: false,
  });

  const categories = categoryResponses as ListResponse<CategoryResponse>;

  useEffect(() => {
    setCategoryOptions(
      categories?.data.map((c) => ({
        value: c.id,
        label: c.name,
      })) || []
    );
  }, [categories?.data]);

  const requestParams = {
    size: 10,
    page: activePage - 1,
    search: debouncedSearchQuery,
    sort: 'createdAt,desc'
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

  const updateBookMutation = useMutation({
    mutationFn: (book: BookRequest) =>
      FetchUtils.putWithToken(
        `${ResourceURL.CLIENT_BOOK}/${book.id}`,
        book,
        true
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "books"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("This book is updated successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed(
        "Failed to update this book. Please try again later."
      );
    },
  });

  const createBookMutation = useMutation({
    mutationFn: (book: BookRequest) =>
      FetchUtils.postWithToken(ResourceURL.CLIENT_BOOK, book, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "books"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("New book added successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to add book. Please try again later.");
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: (id: string) =>
      FetchUtils.deleteWithToken(`${ResourceURL.CLIENT_BOOK}/${id}`, {}, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "books"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("Book deleted successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to delete book. Please try again.");
    },
  });

  const books = bookResponses as ListResponse<BookResponse>;

  let booksContentFragment;

  if (isLoadingBookResponses) {
    booksContentFragment = (
      <Stack>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (isErrorBookResponses) {
    booksContentFragment = (
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

  if (books) {
    booksContentFragment = (
      <>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "4%" }}>No.</Table.Th>
              <Table.Th style={{ width: "12%" }}>Book ID</Table.Th>
              <Table.Th style={{ width: "18%" }}>Title</Table.Th>
              <Table.Th style={{ width: "12%" }}>Author</Table.Th>
              <Table.Th style={{ width: "10%" }}>Category</Table.Th>
              <Table.Th style={{ width: "10%" }}>Publisher</Table.Th>
              <Table.Th style={{ width: "8%" }}>Price</Table.Th>
              <Table.Th style={{ width: "9%" }}>Publication date</Table.Th>
              <Table.Th style={{ width: "8%" }}>Source</Table.Th>
              <Table.Th style={{ width: "9%", textAlign: "center" }}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {books?.data.map((book, index) => (
              <Table.Tr key={book.id}>
                <Table.Td>
                  {(activePage - 1) * requestParams.size + index + 1}
                </Table.Td>
                <Table.Td>{book.isbn}</Table.Td>
                <Table.Td>{book.title}</Table.Td>
                <Table.Td>
                  {book.authors.map((author) => author.name).join(" - ")}
                </Table.Td>
                <Table.Td>
                  {book.categories.map((category) => category.name).join(" - ")}
                </Table.Td>
                <Table.Td>{book.publisher}</Table.Td>
                <Table.Td>{NumberUtils.formatCurrency(book.price)}</Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToDate(book.publicationDate)}
                </Table.Td>
                <Table.Td>{book.source?.name}</Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-start">
                    <Tooltip label="View details">
                      <ActionIcon
                        variant="subtle"
                        radius={"md"}
                        onClick={() => {
                          setSelectedBook(book);
                          setModalMode("view");
                          setViewUpdateModal(true);
                        }}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Update book details">
                      <ActionIcon
                        variant="subtle"
                        radius={"md"}
                        onClick={() => {
                          setSelectedBook(book);
                          setModalMode("edit");
                          setViewUpdateModal(true);
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete book">
                        <ActionIcon
                          variant="subtle"
                          radius={"md"}
                          onClick={() => {
                            deleteBookMutation.mutate(book.id);
                          }}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="space-between" mt={"lg"}>
          <Pagination
            value={activePage}
            total={books?.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text>
            <Text component="span" size="sm">
              Page {activePage}/{books?.totalPages}
            </Text>
          </Text>
        </Group>
      </>
    );
  }

  return (
    <>
      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Title order={2}>Book Management</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              color="blue"
              radius="md"
              onClick={() => {
                setSelectedBook({
                  id: "",
                  isbn: "",
                  title: "",
                  authors: [],
                  categories: [],
                  publisher: "",
                  price: 0,
                  description: "",
                  publicationDate: "",
                  source: { id: "4", name: "System" },
                  createdAt: "",
                  updatedAt: "",
                  slug: "",
                  bookCover: "",
                  imageUrl: "",
                  numberOfPages: 0,
                  inventory: 0,
                  averageRating: 0,
                  ratingCount: 0,
                  reviewCount: 0,
                });
                setModalMode("create");
                setViewUpdateModal(true);
              }}
            >
              Add new book
            </Button>
          </Group>
          <TextInput
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            radius="md"
          />
        </Stack>
      </Card>

      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        {booksContentFragment}
      </Card>

      <Modal
        opened={viewUpdateModal}
        onClose={() => setViewUpdateModal(false)}
        title={<Title order={3}>BOOK INFORMATION</Title>}
        size="xl"
        radius={"md"}
        closeOnClickOutside={false}
      >
        {selectedBook ? (
          <Stack>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="Book ID (ISBN)"
                  value={selectedBook.isbn}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, isbn: e.target.value })
                  }
                  disabled={modalMode !== "create"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Title"
                  value={selectedBook.title}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, title: e.target.value })
                  }
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Slug"
                  value={selectedBook.slug}
                  onChange={(e) =>
                    setSelectedBook({ ...selectedBook, slug: e.target.value })
                  }
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Book cover"
                  value={selectedBook.bookCover}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      bookCover: e.target.value,
                    })
                  }
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Image URL"
                  value={selectedBook.imageUrl}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      imageUrl: e.target.value,
                    })
                  }
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  label="Number of pages"
                  value={selectedBook.numberOfPages}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      numberOfPages: Number(e) || 0,
                    })
                  }
                  allowDecimal={false}
                  thousandSeparator=","
                  allowNegative={false}
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <MultiSelect
                  label="Authors"
                  placeholder="Search and select authors"
                  data={authorOptions}
                  value={selectedBook.authors.map((a) => a.id)}
                  onChange={(value) =>
                    setSelectedBook({
                      ...selectedBook,
                      authors: value.map(
                        (id) =>
                          // Try to find the full AuthorResponse from selectedBook.authors or fallback to minimal info
                          selectedBook.authors.find((a) => a.id === id) || {
                            id:
                              authorOptions.find((opt) => opt.value === id)
                                ?.value || "",
                            name:
                              authorOptions.find((opt) => opt.value === id)
                                ?.label || "",
                            createdAt: "",
                            updatedAt: "",
                          }
                      ),
                    })
                  }
                  searchable
                  onSearchChange={setAuthorSearch}
                  searchValue={authorSearch}
                  nothingFoundMessage="No authors found"
                  disabled={modalMode === "view"}
                  limit={20}
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <MultiSelect
                  label="Categories"
                  data={categoryOptions} // array of { value: string, label: string }
                  value={selectedBook.categories.map((c) => c.id)} // selected category UUIDs
                  onChange={(value) =>
                    setSelectedBook({
                      ...selectedBook,
                      categories: value
                        .map((id) =>
                          categories?.data.find((cat) => cat.id === id)
                        )
                        .filter((cat): cat is CategoryResponse => !!cat),
                    })
                  }
                  searchable
                  hidePickedOptions
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Publisher"
                  value={selectedBook.publisher}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      publisher: e.target.value,
                    })
                  }
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  label="Price (đ)"
                  value={selectedBook.price}
                  onChange={(val) =>
                    setSelectedBook({
                      ...selectedBook,
                      price: Number(val) || 0,
                    })
                  }
                  allowDecimal={false}
                  thousandSeparator=","
                  allowNegative={false}
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DateInput
                  label="Publication date"
                  value={
                    selectedBook.publicationDate
                      ? new Date(selectedBook.publicationDate)
                      : null
                  }
                  onChange={(date) => {
                    // handle date change, e.g.
                    setSelectedBook({
                      ...selectedBook,
                      publicationDate:
                        date instanceof Date && !isNaN(date.getTime())
                          ? date.toISOString()
                          : "",
                    });
                  }}
                  disabled={modalMode === "view"}
                  valueFormat="DD-MM-YYYY"
                  clearable
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  label="Inventory"
                  value={selectedBook.inventory}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      inventory: Number(e) || 0,
                    })
                  }
                  allowDecimal={false}
                  thousandSeparator=","
                  allowNegative={false}
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Source"
                  value={selectedBook.source?.name}
                  disabled
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Description"
                  value={selectedBook.description}
                  onChange={(e) =>
                    setSelectedBook({
                      ...selectedBook,
                      description: e.target.value,
                    })
                  }
                  rows={10}
                  disabled={modalMode === "view"}
                />
              </Grid.Col>
              {modalMode !== "create" && (
                <>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Created at"
                      value={DateUtils.convertTimestampToUTC(
                        selectedBook.createdAt
                      )}
                      disabled
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Updated at"
                      value={DateUtils.convertTimestampToUTC(
                        selectedBook.updatedAt
                      )}
                      disabled
                    />
                  </Grid.Col>
                </>
              )}
            </Grid>

            {modalMode !== "view" ? (
              <Group justify="center" mt="md" grow>
                <Button
                  color="green"
                  size="md"
                  radius="md"
                  onClick={() => {
                    if (selectedBook) {
                      if (modalMode === "edit") {
                        updateBookMutation.mutate({
                          ...selectedBook,
                          categories: selectedBook.categories.map((c) => c.id),
                          authors: selectedBook.authors.map((a) => a.id),
                          source: Number(selectedBook.source?.id) || 4
                        });
                      } else if (modalMode === "create") {
                        createBookMutation.mutate({
                          ...selectedBook,
                          categories: selectedBook.categories.map((c) => c.id),
                          authors: selectedBook.authors.map((a) => a.id),
                          source: Number(selectedBook.source?.id) || 4
                        });
                      }
                      console.log(selectedBook);
                    }
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  radius="md"
                  onClick={() => {
                    // Save logic here
                    setViewUpdateModal(false);
                  }}
                >
                  Cancel
                </Button>
              </Group>
            ) : (
              <Group justify="center" mt="md" grow>
                <Button
                  size="md"
                  radius="md"
                  onClick={() => {
                    // Save logic here
                    setViewUpdateModal(false);
                  }}
                >
                  Close
                </Button>
              </Group>
            )}
          </Stack>
        ) : (
          <Text>No book selected.</Text>
        )}
      </Modal>
    </>
  );
};

export default AdminBookPage;
