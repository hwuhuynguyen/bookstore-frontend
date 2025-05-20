import {
  Title,
  Table,
  Group,
  ActionIcon,
  TextInput,
  Button,
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
  IconSearch,
  IconAlertTriangle,
  IconEye,
  IconUserUp,
  IconUserDown,
} from "@tabler/icons-react";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { UserResponse } from "../../models/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ResourceURL from "../../constants/ResourceURL";
import DateUtils from "../../utils/DateUtils";
import StatusUtils from "../../utils/StatusUtils";
import useAdminAuthStore from "../../stores/AdminAuthStore";
import { useDebouncedValue } from "@mantine/hooks";
import NotifyUtils from "../../utils/NotifyUtils";

const AdminUserPage = () => {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const { user } = useAdminAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null); // Selected user for update
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  const requestParams = {
    size: 10,
    page: activePage - 1,
    search: debouncedSearchQuery,
  };

  const {
    data: userResponses,
    isLoading: isLoadingUserResponses,
    isError: isErrorUserResponses,
  } = useQuery<ListResponse<UserResponse>, ErrorMessage>({
    queryKey: ["client-api", "users", "getAllUsers", requestParams],
    queryFn: () =>
      FetchUtils.getWithToken<ListResponse<UserResponse>>(
        ResourceURL.ADMIN_GET_ALL_USERS,
        requestParams,
        true
      ),
    refetchOnWindowFocus: false,
  });

  const users = userResponses as ListResponse<UserResponse>;

  const promoteMutation = useMutation({
    mutationFn: (userId: string) =>
      FetchUtils.putWithToken(
        `${ResourceURL.USER_BASE}/${userId}/promote`,
        {},
        true
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-api", "users", "getAllUsers"],
      });
      NotifyUtils.simpleSuccess(
        "This user has been successfully promoted to Admin."
      );
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to promote user. Please try again later.")
    },
  });

  const demoteMutation = useMutation({
    mutationFn: (userId: string) =>
      FetchUtils.putWithToken(
        `${ResourceURL.USER_BASE}/${userId}/demote`,
        {},
        true
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-api", "users", "getAllUsers"],
      });
      NotifyUtils.simpleSuccess("This user has been successfully demoted to User.");
    },
    onError: () => {
      NotifyUtils.simpleFailed("Failed to demote user. Please try again later.")
    },
  });

  let usersContentFragment;

  if (isLoadingUserResponses) {
    usersContentFragment = (
      <Stack>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (isErrorUserResponses) {
    usersContentFragment = (
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
  if (users) {
    usersContentFragment = (
      <>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "4%" }}>No.</Table.Th>
              <Table.Th style={{ width: "9%" }}>User ID</Table.Th>
              <Table.Th style={{ width: "12%" }}>Name</Table.Th>
              <Table.Th style={{ width: "9%" }}>Username</Table.Th>
              <Table.Th style={{ width: "13%" }}>Email</Table.Th>
              <Table.Th style={{ width: "11%" }}>Phone number</Table.Th>
              <Table.Th style={{ width: "11%" }}>Created at</Table.Th>
              <Table.Th style={{ width: "11%" }}>Updated at</Table.Th>
              <Table.Th style={{ width: "10%", textAlign: "center" }}>
                Role
              </Table.Th>
              <Table.Th style={{ width: "10%", textAlign: "center" }}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users?.data?.map((userData, index) => (
              <Table.Tr key={userData.id}>
                <Table.Td>
                  {(activePage - 1) * requestParams.size + index + 1}
                </Table.Td>
                <Table.Td>{userData.id}</Table.Td>
                <Table.Td>
                  {userData.firstName + " " + userData.lastName}
                </Table.Td>
                <Table.Td>{userData.username}</Table.Td>
                <Table.Td>{userData.email}</Table.Td>
                <Table.Td>{userData.phoneNumber}</Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(userData.createdAt)}
                </Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(userData.updatedAt)}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  {userData?.roles?.map((role) =>
                    StatusUtils.roleBadgeFragment(role.code)
                  )}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-start">
                    <Tooltip label="View details">
                      <ActionIcon
                        variant="subtle"
                        radius={"md"}
                        onClick={() => {
                          setSelectedUser(userData);
                          setModalMode("view");
                          setViewUpdateModal(true);
                        }}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                    </Tooltip>
                    {/* <Tooltip label="Update user details">
                      <ActionIcon
                        variant="subtle"
                        radius={"md"}
                        onClick={() => {
                          setSelectedUser(user);
                          setModalMode("edit");
                          setViewUpdateModal(true);
                        }}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Tooltip> */}
                    <Tooltip label="Promote to Admin">
                      <ActionIcon
                        variant="subtle"
                        radius="md"
                        disabled={userData.roles?.some(
                          (r) => r.code === "ADMIN"
                        )}
                        onClick={() => promoteMutation.mutate(userData.id)}
                      >
                        <IconUserUp size={16} />
                      </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Demote to User">
                      <ActionIcon
                        variant="subtle"
                        radius="md"
                        disabled={
                          !userData.roles?.some((r) => r.code === "ADMIN") ||
                          user?.id === userData.id
                        }
                        onClick={() => demoteMutation.mutate(userData.id)}
                      >
                        <IconUserDown size={16} />
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
            total={users?.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text>
            <Text component="span" size="sm">
              Page {activePage}/{users?.totalPages}
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
            <Title order={2}>User Management</Title>
            {/* <Button
              leftSection={<IconPlus size={16} />}
              color="blue"
              radius="md"
            >
              Add new user
            </Button> */}
          </Group>
          <TextInput
            placeholder="Search users by name, username, email or phone number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            radius="md"
          />
        </Stack>
      </Card>

      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        {usersContentFragment}
      </Card>

      <Modal
        opened={viewUpdateModal}
        onClose={() => setViewUpdateModal(false)}
        title={<Title order={3}>USER INFORMATION</Title>}
        size="lg"
        radius="md"
        closeOnClickOutside={false}
      >
        {selectedUser ? (
          <Stack>
            <TextInput label="User ID" value={selectedUser.id} disabled />

            <TextInput
              label="Full name"
              value={selectedUser.firstName + " " + selectedUser.lastName}
              disabled
            />

            <TextInput
              label="Username"
              value={selectedUser.username}
              disabled
            />

            <TextInput
              label="Email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              disabled={modalMode === "view"}
            />

            <TextInput
              label="Phone Number"
              value={selectedUser.phoneNumber}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  phoneNumber: e.target.value,
                })
              }
              disabled={modalMode === "view"}
            />

            <TextInput
              label="Role"
              value={selectedUser?.roles?.map((r) => r.code).join(", ")}
              disabled
            />

            <TextInput
              label="Created at"
              value={DateUtils.convertTimestampToUTC(selectedUser.createdAt)}
              disabled
            />

            <TextInput
              label="Updated at"
              value={DateUtils.convertTimestampToUTC(selectedUser.updatedAt)}
              disabled
            />

            {modalMode === "edit" ? (
              <Group justify="center" mt="md" grow>
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
          <Text>No user selected.</Text>
        )}
      </Modal>
    </>
  );
};

export default AdminUserPage;
