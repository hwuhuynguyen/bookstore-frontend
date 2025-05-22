import {
  Title,
  Table,
  Group,
  Button,
  TextInput,
  ActionIcon,
  Modal,
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
  IconPlus,
  IconSearch,
  IconAlertTriangle,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ResourceURL from "../../constants/ResourceURL";
import DateUtils from "../../utils/DateUtils";
import { AuthorRequest, AuthorResponse } from "../../models/Author";
import NotifyUtils from "../../utils/NotifyUtils";
import { useDebouncedValue } from "@mantine/hooks";
const AdminAuthorPage = () => {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorResponse | null>(
    null
  ); // Selected author for update
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "view"
  );
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  const requestParams = {
    size: 10,
    page: activePage - 1,
    sort: "name,asc",
    search: debouncedSearchQuery,
  };

  const {
    data: authorResponses,
    isLoading: isLoadingAuthorResponses,
    isError: isErrorAuthorResponses,
  } = useQuery<ListResponse<AuthorResponse>, ErrorMessage>({
    queryKey: ["client-api", "authors", "getAllAuthors", requestParams],
    queryFn: () =>
      FetchUtils.getWithToken<ListResponse<AuthorResponse>>(
        ResourceURL.ADMIN_GET_ALL_AUTHORS,
        requestParams,
        true
      ),
    refetchOnWindowFocus: false,
  });

  const updateAuthorMutation = useMutation({
    mutationFn: (author: AuthorRequest) =>
      FetchUtils.putWithToken(
        `${ResourceURL.AUTHOR_BASE}/${author.id}`,
        author,
        true
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "authors"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("This author is updated successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed(
        "Failed to update this author. Please try again later."
      );
    },
  });

  const createAuthorMutation = useMutation({
    mutationFn: (author: AuthorRequest) =>
      FetchUtils.postWithToken(ResourceURL.AUTHOR_BASE, author, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "authors"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("New author added successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to add author. Please try again later.");
    },
  });

  const deleteAuthorMutation = useMutation({
    mutationFn: (id: string) =>
      FetchUtils.deleteWithToken(`${ResourceURL.AUTHOR_BASE}/${id}`, {}, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "authors"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("Author deleted successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to delete author. Please try again.");
    },
  });

  const authors = authorResponses as ListResponse<AuthorResponse>;
  let authorsContentFragment;

  if (isLoadingAuthorResponses) {
    authorsContentFragment = (
      <Stack>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (isErrorAuthorResponses) {
    authorsContentFragment = (
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
  if (authors) {
    authorsContentFragment = (
      <>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "5%" }}>No.</Table.Th>
              <Table.Th style={{ width: "25%" }}>Author ID</Table.Th>
              <Table.Th style={{ width: "20%" }}>Name</Table.Th>
              <Table.Th style={{ width: "14%" }}>Total books</Table.Th>
              <Table.Th style={{ width: "12%" }}>Created at</Table.Th>
              <Table.Th style={{ width: "12%" }}>Updated at</Table.Th>
              <Table.Th style={{ width: "12%", textAlign: "center" }}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {authors?.data.map((author, index) => (
              <Table.Tr key={author.id}>
                <Table.Td>
                  {(activePage - 1) * requestParams.size + index + 1}
                </Table.Td>
                <Table.Td>{author.id}</Table.Td>
                <Table.Td>{author.name}</Table.Td>
                <Table.Td>{author.totalBooks}</Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(author.createdAt)}
                </Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(author.updatedAt)}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-start">
                    <Tooltip label="View details">
                      <ActionIcon
                        variant="subtle"
                        radius={"md"}
                        onClick={() => {
                          setSelectedAuthor(author);
                          setModalMode("view");
                          setViewUpdateModal(true);
                        }}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Update author details">
                      <ActionIcon
                        variant="subtle"
                        radius={"md"}
                        onClick={() => {
                          setSelectedAuthor(author);
                          setModalMode("edit");
                          setViewUpdateModal(true);
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Tooltip>
                    {author.totalBooks == 0 && (
                      <Tooltip label="Delete author">
                        <ActionIcon
                          variant="subtle"
                          radius={"md"}
                          onClick={() => {
                            deleteAuthorMutation.mutate(author.id);
                          }}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="space-between" mt={"lg"}>
          <Pagination
            value={activePage}
            total={authors?.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text>
            <Text component="span" size="sm">
              Page {activePage}/{authors?.totalPages}
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
            <Title order={2}>Author Management</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              color="blue"
              radius="md"
              onClick={() => {
                setSelectedAuthor({
                  id: "",
                  name: "",
                  createdAt: "",
                  updatedAt: "",
                  totalBooks: 0,
                });
                setModalMode("create");
                setViewUpdateModal(true);
              }}
            >
              Add new author
            </Button>
          </Group>
          <TextInput
            placeholder="Search authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            radius="md"
          />
        </Stack>
      </Card>

      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        {authorsContentFragment}
      </Card>

      <Modal
        opened={viewUpdateModal}
        onClose={() => setViewUpdateModal(false)}
        title={<Title order={3}>AUTHOR INFORMATION</Title>}
        size="lg"
        radius="md"
        closeOnClickOutside={false}
      >
        {selectedAuthor ? (
          <Stack>
            {modalMode !== "create" && (
              <TextInput label="Author ID" value={selectedAuthor.id} disabled />
            )}

            <TextInput
              label="Author name"
              value={selectedAuthor.name}
              onChange={(e) =>
                setSelectedAuthor({
                  ...selectedAuthor,
                  name: e.target.value,
                })
              }
              disabled={modalMode === "view"}
            />

            {modalMode !== "create" && (
              <TextInput
                label="Created at"
                value={DateUtils.convertTimestampToUTC(
                  selectedAuthor.createdAt
                )}
                disabled
              />
            )}
            {modalMode !== "create" && (
              <TextInput
                label="Updated at"
                value={DateUtils.convertTimestampToUTC(
                  selectedAuthor.updatedAt
                )}
                disabled
              />
            )}

            {modalMode !== "view" ? (
              <Group justify="center" mt="md" grow>
                <Button
                  color="green"
                  size="md"
                  radius="md"
                  onClick={() => {
                    if (selectedAuthor) {
                      if (modalMode === "edit") {
                        updateAuthorMutation.mutate(selectedAuthor);
                      } else if (modalMode === "create") {
                        createAuthorMutation.mutate(selectedAuthor);
                      }
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
          <Text>No author selected.</Text>
        )}
      </Modal>
    </>
  );
};

export default AdminAuthorPage;
