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
import { CategoryRequest, CategoryResponse } from "../../models/Category";
import ResourceURL from "../../constants/ResourceURL";
import DateUtils from "../../utils/DateUtils";
import { useDebouncedValue } from "@mantine/hooks";
import NotifyUtils from "../../utils/NotifyUtils";

const AdminCategoryPage = () => {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryResponse | null>(null); // Selected category for update
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
    data: categoryResponses,
    isLoading: isLoadingCategoryResponses,
    isError: isErrorCategoryResponses,
  } = useQuery<ListResponse<CategoryResponse>, ErrorMessage>({
    queryKey: ["client-api", "categories", "getAllCategories", requestParams],
    queryFn: () =>
      FetchUtils.get<ListResponse<CategoryResponse>>(
        `${ResourceURL.CLIENT_CATEGORY}/all`,
        requestParams
      ),
    refetchOnWindowFocus: false,
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (category: CategoryRequest) =>
      FetchUtils.putWithToken(
        `${ResourceURL.CLIENT_CATEGORY}/${category.id}`,
        category,
        true
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "categories"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("This category is updated successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed(
        "Failed to update this category. Please try again later."
      );
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: (category: CategoryRequest) =>
      FetchUtils.postWithToken(ResourceURL.CLIENT_CATEGORY, category, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "categories"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("New category added successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed(
        "Failed to add category. Please try again later."
      );
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) =>
      FetchUtils.deleteWithToken(
        `${ResourceURL.CLIENT_CATEGORY}/${id}`,
        {},
        true
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "categories"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("Category deleted successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to delete category. Please try again.");
    },
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
            {categories?.data.map((category, index) => (
              <Table.Tr key={category.id}>
                <Table.Td>
                  {(activePage - 1) * requestParams.size + index + 1}
                </Table.Td>
                <Table.Td>{category.id}</Table.Td>
                <Table.Td>{category.name}</Table.Td>
                <Table.Td>{category.totalBooks}</Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(category.createdAt)}
                </Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(category.updatedAt)}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-start">
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
                    {category.totalBooks == 0 && (
                      <Tooltip label="Delete category">
                        <ActionIcon
                          variant="subtle"
                          radius={"md"}
                          onClick={() => {
                            deleteCategoryMutation.mutate(category.id);
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
              onClick={() => {
                setSelectedCategory({
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
              Add new category
            </Button>
          </Group>
          <TextInput
            placeholder="Search categories by name..."
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
            {modalMode !== "create" && (
              <TextInput
                label="Category ID"
                value={selectedCategory.id}
                disabled
              />
            )}

            <TextInput
              label="Category name"
              value={selectedCategory.name}
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  name: e.target.value,
                })
              }
              disabled={modalMode === "view"}
            />

            {modalMode !== "create" && (
              <TextInput
                label="Created at"
                value={DateUtils.convertTimestampToUTC(
                  selectedCategory.createdAt
                )}
                disabled
              />
            )}
            {modalMode !== "create" && (
              <TextInput
                label="Updated at"
                value={DateUtils.convertTimestampToUTC(
                  selectedCategory.updatedAt
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
                    if (selectedCategory) {
                      if (modalMode === "edit") {
                        updateCategoryMutation.mutate(selectedCategory);
                      } else if (modalMode === "create") {
                        createCategoryMutation.mutate(selectedCategory);
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
          <Text>No category selected.</Text>
        )}
      </Modal>
    </>
  );
};

export default AdminCategoryPage;
