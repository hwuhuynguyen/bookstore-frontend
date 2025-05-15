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
import { CategoryResponse } from "../../models/Category";
import ResourceURL from "../../constants/ResourceURL";
import DateUtils from "../../utils/DateUtils";

const AdminCategoryPage = () => {
  const theme = useMantineTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(null); // Selected category for update
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const requestParams = {
    size: 10,
    page: activePage - 1,
    sort: "name,asc"
  };

  const {
    data: categoryResponses,
    isLoading: isLoadingCategoryResponses,
    isError: isErrorCategoryResponses,
  } = useQuery<ListResponse<CategoryResponse>, ErrorMessage>({
    queryKey: ["client-api", "users", "getAllUsers", requestParams],
    queryFn: () =>
      FetchUtils.get<ListResponse<CategoryResponse>>(
        ResourceURL.CLIENT_CATEGORY,
        requestParams
      ),
    refetchOnWindowFocus: false,
  });

  const categories = categoryResponses as ListResponse<CategoryResponse>;
  let categoriesContentFragment;

  if (isLoadingCategoryResponses) {
    categoriesContentFragment = (
      <Stack>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (isErrorCategoryResponses) {
    categoriesContentFragment = (
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
  if (categories) {
    categoriesContentFragment = (
      <>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "5%" }}>No.</Table.Th>
              <Table.Th style={{ width: "25%" }}>Category ID</Table.Th>
              <Table.Th style={{ width: "25%" }}>Name</Table.Th>
              <Table.Th style={{ width: "15%" }}>Created at</Table.Th>
              <Table.Th style={{ width: "15%" }}>Updated at</Table.Th>
              <Table.Th style={{ width: "15%", textAlign: "center" }}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {categories?.data.map((category, index) => (
              <Table.Tr key={category.id}>
                <Table.Td>
                  {(activePage - 1) * requestParams.size + index + 1}
                </Table.Td>
                <Table.Td>{category.id}</Table.Td>
                <Table.Td>{category.name}</Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(category.createdAt)}
                </Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(category.updatedAt)}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="center">
                    <Tooltip label="View details">
                      <ActionIcon
                        variant="subtle"
                        radius={"md"}
                        onClick={() => {
                          setSelectedCategory(category);
                          setModalMode("view");
                          setViewUpdateModal(true);
                        }}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Update category details">
                      <ActionIcon
                        variant="subtle"
                        radius={"md"}
                        onClick={() => {
                          setSelectedCategory(category);
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
            total={categories?.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text>
            <Text component="span" size="sm">
              Page {activePage}/{categories?.totalPages}
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
            <Title order={2}>Category Management</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              color="blue"
              radius="md"
            >
              Add new category
            </Button>
          </Group>
          <TextInput
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            radius="md"
          />
        </Stack>
      </Card>
      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        {categoriesContentFragment}
      </Card>

      <Modal
        opened={viewUpdateModal}
        onClose={() => setViewUpdateModal(false)}
        title={<Title order={3}>CATEGORY INFORMATION</Title>}
        size="lg"
        radius="md"
        closeOnClickOutside={false}
      >
        {selectedCategory ? (
          <Stack>
            <TextInput
              label="Category ID"
              value={selectedCategory.id}
              disabled
            />

            <TextInput
              label="Category Name"
              value={selectedCategory.name}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  name: e.target.value,
                })
              }
              disabled={modalMode === "view"}
            />

            <TextInput
              label="Created At"
              value={DateUtils.convertTimestampToUTC(
                selectedCategory.createdAt
              )}
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
          <Text>No category selected.</Text>
        )}
      </Modal>
    </>
  );
};

export default AdminCategoryPage;
