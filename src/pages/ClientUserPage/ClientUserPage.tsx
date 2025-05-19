import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconCheck,
  IconHome,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import UserNavbar from "../../components/UserNavbar";
import useAuthStore from "../../stores/AuthStore";
import { AddressResponse } from "../../models/Address";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserResponse } from "../../models/User";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";

function ClientUserPage() {
  const { user, updateUser } = useAuthStore();
  const queryClient = useQueryClient();
  const [selectedAddress, setSelectedAddress] =
    useState<AddressResponse | null>(
      user?.addresses?.find((addr) => addr.isDefault) || null
    );

  const setDefaultAddressMutation = useMutation<
    UserResponse,
    ErrorMessage,
    string
  >({
    mutationFn: (addressId: string) =>
      FetchUtils.putWithToken(
        `${ResourceURL.CLIENT_USER_ADDRESS}/${addressId}/default`,
        {}
      ),
    onSuccess: (data: UserResponse, variables: string) => {
      const sortedAddresses = [...data.addresses].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      updateUser({ ...data, addresses: sortedAddresses });

      const updatedAddress = data.addresses.find(
        (address) => address.id === variables
      );
      if (updatedAddress) {
        setSelectedAddress(updatedAddress);
      }

      queryClient.invalidateQueries({ queryKey: ["client-api", "addresses"] });
    },
  });

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 2, sm: 1, md: 3 }}>
            <UserNavbar />
          </Grid.Col>

          <Grid.Col span={{ base: 10, sm: 11, md: 9 }}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack gap="md">
                <Title order={2}>Account</Title>

                <Grid gutter="lg">
                  {/* Personal Info */}
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap="md">
                      <Text size="lg" color="dimmed" fw={500}>
                        Personal Information
                      </Text>

                      <Group justify="space-between">
                        <Group>
                          <Avatar color="cyan" size="md" radius="md">
                            {user?.firstName.charAt(0)}
                          </Avatar>
                          <Stack gap={0}>
                            <Text fw={500}>
                              {user?.firstName + " " + user?.lastName}
                            </Text>
                            <Text color="dimmed">@{user?.username}</Text>
                          </Stack>
                        </Group>
                      </Group>

                      {/* Address */}
                      <AddressesSection
                        addresses={user?.addresses}
                        setDefaultAddressMutation={setDefaultAddressMutation}
                        defaultAddress={selectedAddress}
                      />
                    </Stack>
                  </Grid.Col>

                  {/* Contact */}
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap="md">
                      <Text size="lg" color="dimmed" fw={500}>
                        Contact Information
                      </Text>

                      {/* Phone */}
                      <Group justify="space-between">
                        <Group gap="sm">
                          <ThemeIcon radius="xl" size="lg" variant="light">
                            <IconPhone size={20} strokeWidth={1.5} />
                          </ThemeIcon>
                          <Stack gap={0}>
                            <Text fw={500}>Phone</Text>
                            <Text>{user?.phoneNumber}</Text>
                          </Stack>
                        </Group>
                      </Group>

                      {/* Email */}
                      <Group justify="space-between">
                        <Group gap="sm">
                          <ThemeIcon radius="xl" size="lg" variant="light">
                            <IconMail size={20} strokeWidth={1.5} />
                          </ThemeIcon>
                          <Stack gap={0}>
                            <Text fw={500}>Email</Text>
                            <Text>{user?.email}</Text>
                          </Stack>
                        </Group>
                      </Group>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientUserPage;

import { UseMutationResult } from "@tanstack/react-query";

function AddressesSection({
  addresses,
  setDefaultAddressMutation,
  defaultAddress,
}: {
  addresses: AddressResponse[] | undefined;
  setDefaultAddressMutation: UseMutationResult<
    UserResponse,
    ErrorMessage,
    string,
    unknown
  >;
  defaultAddress: AddressResponse | null;
}) {
  const queryClient = useQueryClient();
  const [modalOpened, setModalOpened] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const { updateUser } = useAuthStore();

  if (!addresses || addresses.length === 0) {
    return (
      <Group gap="sm" wrap="nowrap">
        <ThemeIcon radius="xl" size="lg" variant="light">
          <IconHome size={20} strokeWidth={1.5} />
        </ThemeIcon>
        <Stack gap={0}>
          <Text fw={500}>Address</Text>
          <Text color="dimmed">No addresses found</Text>
        </Stack>
      </Group>
    );
  }

  return (
    <Stack gap="md">
      <Group gap="sm" wrap="nowrap">
        <ThemeIcon radius="xl" size="lg" variant="light">
          <IconHome size={20} strokeWidth={1.5} />
        </ThemeIcon>
        <Stack gap={0}>
          <Text fw={500}>Addresses</Text>
          <Text size="sm" color="dimmed">
            {addresses.length} address{addresses.length !== 1 ? "es" : ""} saved
          </Text>
        </Stack>
      </Group>

      <SimpleGrid
        cols={{ base: 1, sm: addresses.length > 1 ? 2 : 1 }}
        spacing="md"
      >
        {addresses.map((address) => (
          <Card
            key={address.id}
            shadow="sm"
            p="md"
            radius="md"
            withBorder
            style={{
              border:
                address.id == defaultAddress?.id
                  ? "2px solid var(--mantine-color-blue-5)"
                  : undefined,
            }}
          >
            <Group justify="space-between" mb="xs">
              <Group gap="xs">
                <IconMapPin
                  size={16}
                  style={{ color: "var(--mantine-color-gray-6)" }}
                />
                <Text fw={500} size="sm" truncate>
                  Address
                </Text>
              </Group>
              {address.id == defaultAddress?.id && (
                <Badge color="blue" variant="light" size="sm">
                  <Group gap="xs">
                    <IconCheck size={12} />
                    <Text size="xs">Default</Text>
                  </Group>
                </Badge>
              )}
            </Group>

            <Text size="sm">{address.address}</Text>

            <Group mt="md" gap="xs">
              {address.id != defaultAddress?.id && (
                <Button
                  variant="light"
                  size="xs"
                  color="blue"
                  onClick={() => setDefaultAddressMutation.mutate(address.id)}
                >
                  Set as default
                </Button>
              )}
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Button
        variant="outline"
        size="sm"
        leftSection={<IconMapPin size={16} />}
        style={{ alignSelf: "flex-start" }}
        onClick={() => setModalOpened(true)}
      >
        Add new address
      </Button>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={<Title order={3}>ADD NEW ADDRESS</Title>}
      >
        <Stack>
          <Textarea
            label="Address"
            placeholder="Enter your address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.currentTarget.value)}
          />
          <Button
            onClick={() => {
              FetchUtils.postWithToken(ResourceURL.CLIENT_USER_ADDRESS, {
                address: newAddress,
              }).then((data) => {
                const userData = data as UserResponse;
                // Sort addresses for consistency
                const sortedAddresses = [...userData.addresses].sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                );

                // Update global user store
                updateUser({ ...userData, addresses: sortedAddresses });
                // UI updates
                setModalOpened(false);
                setNewAddress("");

                queryClient.invalidateQueries({
                  queryKey: ["client-api", "addresses"],
                });
              });
            }}
          >
            Save
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
