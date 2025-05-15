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
} from "@mantine/core";
import { useState } from "react";
import {
  IconSearch,
  IconPlus,
  IconAlertTriangle,
  IconEye,
  IconEdit,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { BookResponse } from "../../models/Book";
import ResourceURL from "../../constants/ResourceURL";
import NumberUtils from "../../utils/NumberUtils";
import DateUtils from "../../utils/DateUtils";

const AdminBookPage = () => {
  const theme = useMantineTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookResponse | null>(null); // Selected book for update
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const requestParams = {
    size: 10,
    page: activePage - 1,
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
              <Table.Th style={{ width: "12%" }}>Publisher</Table.Th>
              <Table.Th style={{ width: "8%" }}>Price</Table.Th>
              <Table.Th style={{ width: "10%" }}>Publication Date</Table.Th>
              <Table.Th style={{ width: "8%" }}>Source</Table.Th>
              <Table.Th style={{ width: "6%", textAlign: "center" }}>
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
                <Table.Td>{book.source.name}</Table.Td>
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
            <TextInput
              label="Book ID (ISBN)"
              value={selectedBook.isbn}
              disabled
            />
            <TextInput
              label="Title"
              value={selectedBook.title}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, title: e.target.value })
              }
              disabled={modalMode === "view"}
            />
            <TextInput
              label="Authors"
              value={selectedBook.authors.map((a) => a.name).join(" - ")}
              disabled
            />
            <TextInput
              label="Categories"
              value={selectedBook.categories.map((c) => c.name).join(" - ")}
              disabled
            />
            <TextInput
              label="Publisher"
              value={selectedBook.publisher}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, publisher: e.target.value })
              }
              disabled={modalMode === "view"}
            />
            <NumberInput
              label="Price (đ)"
              value={selectedBook.price}
              onChange={(val) =>
                setSelectedBook({ ...selectedBook, price: Number(val) || 0 })
              }
              allowDecimal={false}
              thousandSeparator=","
              disabled={modalMode === "view"}
            />
            <TextInput
              label="Publication Date"
              value={DateUtils.convertTimestampToDate(
                selectedBook.publicationDate
              )}
              disabled
            />
            <TextInput
              label="Source"
              value={selectedBook.source.name}
              disabled
            />
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

            {modalMode === "edit" && (
              <Group justify="center" mt="md">
                <Button
                  color="green"
                  size="md"
                  radius="md"
                  onClick={() => {
                    // Save logic here (e.g. API call)
                    setViewUpdateModal(false);
                  }}
                >
                  Save Changes
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
