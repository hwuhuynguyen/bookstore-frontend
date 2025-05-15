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
  IconPlus,
  IconAlertTriangle,
  IconEdit,
  IconEye,
} from "@tabler/icons-react";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import { UserResponse } from "../../models/User";
import { useQuery } from "@tanstack/react-query";
import ResourceURL from "../../constants/ResourceURL";
import DateUtils from "../../utils/DateUtils";
import StatusUtils from "../../utils/StatusUtils";

const AdminUserPage = () => {
  const theme = useMantineTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null); // Selected user for update
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const requestParams = {
    size: 10,
    page: activePage - 1,
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
              <Table.Th style={{ width: "10%" }}>User ID</Table.Th>
              <Table.Th style={{ width: "18%" }}>Name</Table.Th>
              <Table.Th style={{ width: "10%" }}>Username</Table.Th>
              <Table.Th style={{ width: "14%" }}>Email</Table.Th>
              <Table.Th style={{ width: "12%" }}>Phone number</Table.Th>
              <Table.Th style={{ width: "14%" }}>Created at</Table.Th>
              <Table.Th style={{ width: "8%", textAlign: "center" }}>Role</Table.Th>
              <Table.Th style={{ width: "10%", textAlign: "center" }}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users?.data.map((user, index) => (
              <Table.Tr key={user.id}>
                <Table.Td>
                  {(activePage - 1) * requestParams.size + index + 1}
                </Table.Td>
                <Table.Td>{user.id}</Table.Td>
                <Table.Td>{user.firstName + " " + user.lastName}</Table.Td>
                <Table.Td>{user.username}</Table.Td>
                <Table.Td>{user.email}</Table.Td>
                <Table.Td>{user.phoneNumber}</Table.Td>
                <Table.Td>
                  {DateUtils.convertTimestampToUTC(user.createdAt)}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  {user.roles.map((role) =>
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
                          setSelectedUser(user);
                          setModalMode("view");
                          setViewUpdateModal(true);
                        }}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Update user details">
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
            <Button
              leftSection={<IconPlus size={16} />}
              color="blue"
              radius="md"
            >
              Add new user
            </Button>
          </Group>
          <TextInput
            placeholder="Search users..."
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
        label="Full Name"
        value={selectedUser.firstName + " " + selectedUser.lastName}
        disabled
      />

      <TextInput label="Username" value={selectedUser.username} disabled />

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
          setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })
        }
        disabled={modalMode === "view"}
      />

      <TextInput
        label="Role"
        value={selectedUser.roles.map((r) => r.code).join(", ")}
        disabled
      />

      <TextInput
        label="Created At"
        value={DateUtils.convertTimestampToUTC(selectedUser.createdAt)}
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
    <Text>No user selected.</Text>
  )}
</Modal>

    </>
  );
};

export default AdminUserPage;
