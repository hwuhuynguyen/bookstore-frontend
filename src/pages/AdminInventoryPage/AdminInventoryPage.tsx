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
  NumberInput,
} from "@mantine/core";
import { useState } from "react";
import {
  IconSearch,
  IconAlertTriangle,
  IconEye,
  IconTrash,
  IconDatabaseEdit,
} from "@tabler/icons-react";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ResourceURL from "../../constants/ResourceURL";
import DateUtils from "../../utils/DateUtils";
import NotifyUtils from "../../utils/NotifyUtils";
import { useDebouncedValue } from "@mantine/hooks";
import { InventoryRequest, InventoryResponse } from "../../models/Inventory";

const AdminInventoryPage = () => {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [selectedInventory, setSelectedInventory] =
    useState<InventoryResponse | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "view"
  );
  
  const [viewStockModal, setViewStockModal] = useState(false);
  const [stockUpdateQuantity, setStockUpdateQuantity] = useState(0);
  const [stockUpdateAdd, setStockUpdateAdd] = useState(true);
  
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);
  const requestParams = {
    size: 10,
    page: activePage - 1,
    sort: "stockCount,asc",
    search: debouncedSearchQuery,
  };

  const {
    data: inventoryResponses,
    isLoading,
    isError,
  } = useQuery<ListResponse<InventoryResponse>, ErrorMessage>({
    queryKey: ["client-api", "inventory", "getAll", requestParams],
    queryFn: () =>
      FetchUtils.getWithToken<ListResponse<InventoryResponse>>(
        ResourceURL.ADMIN_GET_ALL_INVENTORY,
        requestParams,
        true
      ),
    refetchOnWindowFocus: false,
  });

  const updateInventoryMutation = useMutation({
    mutationFn: (item: InventoryRequest) =>
      FetchUtils.putWithToken(
        `${ResourceURL.INVENTORY_BASE}/${item.bookId}`,
        item,
        true
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "inventory"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("Inventory item updated successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to update inventory item.");
    },
  });

  const createInventoryMutation = useMutation({
    mutationFn: (item: InventoryRequest) =>
      FetchUtils.postWithToken(ResourceURL.INVENTORY_BASE, item, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "inventory"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("Inventory item added successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to add inventory item.");
    },
  });

  const deleteInventoryMutation = useMutation({
    mutationFn: (id: string) =>
      FetchUtils.deleteWithToken(
        `${ResourceURL.INVENTORY_BASE}/${id}`,
        {},
        true
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-api", "inventory"] });
      setViewUpdateModal(false);
      NotifyUtils.simpleSuccess("Inventory item deleted.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to delete inventory item.");
    },
  });

  const updateStockMutation = useMutation({
    mutationFn: ({
      id,
      quantity,
      add,
    }: {
      id: string;
      quantity: number;
      add: boolean;
    }) =>
      FetchUtils.putWithToken(
        `${ResourceURL.INVENTORY_BASE}/${id}/stock`,
        { quantity, add },
        true
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-api", "inventory"],
      });
      setViewStockModal(false);
      NotifyUtils.simpleSuccess("Stock updated successfully.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to update stock. Please try again.");
    },
  });

  const inventories = inventoryResponses as ListResponse<InventoryResponse>;

  let content;

  if (isLoading) {
    content = (
      <Stack>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  } else if (isError) {
    content = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.pink[6] }}
      >
        <IconAlertTriangle size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          Error loading inventory data
        </Text>
      </Stack>
    );
  } else {
    content = (
      <>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "5%" }}>No.</Table.Th>
              <Table.Th style={{ width: "15%" }}>ID</Table.Th>
              <Table.Th style={{ width: "15%" }}>Book ID</Table.Th>
              <Table.Th style={{ width: "25%" }}>Book title</Table.Th>
              <Table.Th style={{ width: "10%" }}>Stock count</Table.Th>
              <Table.Th style={{ width: "10%" }}>Created</Table.Th>
              <Table.Th style={{ width: "10%" }}>Updated</Table.Th>
              <Table.Th style={{ width: "10%", textAlign: "center" }}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {inventories?.data.map((item, index) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  {(activePage - 1) * requestParams.size + index + 1}
                </Table.Td>
                <Table.Td>{item.id}</Table.Td>
                <Table.Td>{item.bookId}</Table.Td>
                <Table.Td>{item.bookTitle}</Table.Td>
                <Table.Td>{item.stockCount}</Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(item.createdAt)}
                </Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(item.updatedAt)}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-start">
                    <Tooltip label="View">
                      <ActionIcon
                        variant="subtle"
                        radius="md"
                        onClick={() => {
                          setSelectedInventory(item);
                          setModalMode("view");
                          setViewUpdateModal(true);
                        }}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Update stock quantity">
                      <ActionIcon
                        variant="subtle"
                        radius="md"
                        onClick={() => {
                          setSelectedInventory(item);
                          setStockUpdateQuantity(0);
                          setStockUpdateAdd(true);
                          setViewStockModal(true);
                        }}
                      >
                        <IconDatabaseEdit size={16} />
                      </ActionIcon>
                    </Tooltip>

                    {item.stockCount === 0 && (
                      <Tooltip label="Delete">
                        <ActionIcon
                          variant="subtle"
                          radius="md"
                          onClick={() =>
                            deleteInventoryMutation.mutate(item.id)
                          }
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
        <Group justify="space-between" mt="lg">
          <Pagination
            value={activePage}
            total={inventories?.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text size="sm">
            Page {activePage}/{inventories?.totalPages}
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
            <Title order={2}>Inventory Management</Title>
          </Group>
          <TextInput
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            radius="md"
          />
        </Stack>
      </Card>

      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        {content}
      </Card>

      <Modal
        opened={viewUpdateModal}
        onClose={() => {
          setViewUpdateModal(false);
          setSelectedInventory(null);
        }}
        title={<Title order={3}>INVENTORY INFORMATION</Title>}
        size="lg"
        radius="md"
        closeOnClickOutside={false}
      >
        {selectedInventory ? (
          <Stack>
            {modalMode !== "create" && (
              <TextInput label="ID" value={selectedInventory.id} disabled />
            )}
            <TextInput
              label="Book ID"
              value={selectedInventory.bookId}
              disabled
            />
            <TextInput
              label="Book title"
              value={selectedInventory.bookTitle}
              disabled
            />
            <NumberInput
              label="Inventory"
              value={selectedInventory.stockCount}
              onChange={(e) =>
                setSelectedInventory({
                  ...selectedInventory,
                  stockCount: Number(e) || 0,
                })
              }
              allowDecimal={false}
              thousandSeparator=","
              allowNegative={false}
              disabled={modalMode === "view"}
            />
            {modalMode !== "create" && (
              <>
                <TextInput
                  label="Created at"
                  value={DateUtils.convertTimestampToUTC(
                    selectedInventory.createdAt
                  )}
                  disabled
                />
                <TextInput
                  label="Updated at"
                  value={DateUtils.convertTimestampToUTC(
                    selectedInventory.updatedAt
                  )}
                  disabled
                />
              </>
            )}
            <Group justify="center" mt="md" grow>
              {modalMode === "view" ? (
                <Button
                  size="md"
                  radius="md"
                  onClick={() => setViewUpdateModal(false)}
                >
                  Close
                </Button>
              ) : (
                <>
                  <Button
                    color="green"
                    size="md"
                    radius="md"
                    onClick={() => {
                      if (modalMode === "edit") {
                        updateInventoryMutation.mutate(selectedInventory);
                      } else if (modalMode === "create") {
                        createInventoryMutation.mutate(selectedInventory);
                      }
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    radius="md"
                    onClick={() => setViewUpdateModal(false)}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Group>
          </Stack>
        ) : (
          <Text>No item selected.</Text>
        )}
      </Modal>
      <Modal
        opened={viewStockModal}
        onClose={() => setViewStockModal(false)}
        title={<Title order={3}>UPDATE STOCK COUNT</Title>}
        size="md"
        radius="md"
        closeOnClickOutside={false}
      >
        <Stack>
          <Text>
            Updating stock for: <strong>{selectedInventory?.bookTitle}</strong>
          </Text>
          <Group justify="center" mt="md" grow>
            <Button
              radius="md"
              variant={stockUpdateAdd ? "filled" : "outline"}
              onClick={() => setStockUpdateAdd(true)}
            >
              Add
            </Button>
            <Button
              radius="md"
              variant={!stockUpdateAdd ? "filled" : "outline"}
              onClick={() => setStockUpdateAdd(false)}
            >
              Subtract
            </Button>
          </Group>
          <NumberInput
            label="Quantity"
            allowDecimal={false}
            thousandSeparator=","
            allowNegative={false}
            min={1}
            value={stockUpdateQuantity}
            onChange={(e) => setStockUpdateQuantity(Number(e))}
          />
          <Group justify="center" mt="md" grow>
            <Button
              color="green"
              radius="md"
              onClick={() => {
                if (selectedInventory && stockUpdateQuantity > 0) {
                  updateStockMutation.mutate({
                    id: selectedInventory.id,
                    quantity: stockUpdateQuantity,
                    add: stockUpdateAdd,
                  });
                }
              }}
            >
              Save
            </Button>
            <Button
              radius="md"
              variant="outline"
              onClick={() => setViewStockModal(false)}
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default AdminInventoryPage;
