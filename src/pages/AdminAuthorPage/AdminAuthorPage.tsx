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
} from "@tabler/icons-react";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { useQuery } from "@tanstack/react-query";
import ResourceURL from "../../constants/ResourceURL";
import DateUtils from "../../utils/DateUtils";
import { AuthorResponse } from "../../models/Author";
const AdminAuthorPage = () => {
  const theme = useMantineTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorResponse | null>(
    null
  ); // Selected author for update
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const requestParams = {
    size: 10,
    page: activePage - 1,
    sort: "name,asc",
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
              <Table.Th style={{ width: "25%" }}>Name</Table.Th>
              <Table.Th style={{ width: "15%" }}>Created at</Table.Th>
              <Table.Th style={{ width: "15%" }}>Updated at</Table.Th>
              <Table.Th style={{ width: "15%", textAlign: "center" }}>
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
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(author.createdAt)}
                </Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(author.updatedAt)}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="center">
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
            <TextInput label="Author ID" value={selectedAuthor.id} disabled />

            <TextInput
              label="Author Name"
              value={selectedAuthor.name}
              onChange={(e) =>
                setSelectedAuthor({
                  ...selectedAuthor,
                  name: e.target.value,
                })
              }
              disabled={modalMode === "view"}
            />

            <TextInput
              label="Created At"
              value={DateUtils.convertTimestampToUTC(selectedAuthor.createdAt)}
              disabled
            />

            {modalMode === "edit" && (
              <Group justify="center" mt="md">
                <Button
                  color="green"
                  size="md"
                  radius="md"
                  onClick={() => {
                    // Save logic here
                    setViewUpdateModal(false);
                  }}
                >
                  Save Changes
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
