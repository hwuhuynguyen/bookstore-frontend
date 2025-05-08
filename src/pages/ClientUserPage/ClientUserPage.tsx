import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconCheck,
  IconHome,
  IconMail,
  IconMapPin,
  IconMars,
  IconPhone,
  IconVenus,
} from "@tabler/icons-react";
import UserNavbar from "../../components/UserNavbar";
import useAuthStore from "../../stores/AuthStore";
import { AddressResponse } from "../../models/Address";

function ClientUserPage() {
  const { user } = useAuthStore();

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
                            <Text fw={500}>{user?.firstName + " " + user?.lastName}</Text>
                            <Text color="dimmed">@{user?.username}</Text>
                          </Stack>
                        </Group>
                      </Group>

                      {/* Gender */}
                      <Group gap="sm" wrap="nowrap">
                        <ThemeIcon radius="xl" size="lg" variant="light">
                          {user?.gender === "M" ? (
                            <IconMars size={20} strokeWidth={1.5} />
                          ) : (
                            <IconVenus size={20} strokeWidth={1.5} />
                          )}
                        </ThemeIcon>
                        <Stack gap={0}>
                          <Text fw={500}>Gender</Text>
                          <Text>
                            {user?.gender === "M" ? "Male" : "Female"}
                          </Text>
                        </Stack>
                      </Group>

                      {/* Address */}
                      <AddressesSection addresses={user?.addresses} />
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

function AddressesSection({ addresses }: {addresses: AddressResponse[] | undefined}) {
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

  const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
  
  return (
    <Stack gap="md">
      <Group gap="sm" wrap="nowrap">
        <ThemeIcon radius="xl" size="lg" variant="light">
          <IconHome size={20} strokeWidth={1.5} />
        </ThemeIcon>
        <Stack gap={0}>
          <Text fw={500}>Addresses</Text>
          <Text size="sm" color="dimmed">
            {addresses.length} address{addresses.length !== 1 ? 'es' : ''} saved
          </Text>
        </Stack>
      </Group>
      
      <SimpleGrid cols={{ base: 1, sm: addresses.length > 1 ? 2 : 1 }} spacing="md">
        {addresses.map((address) => (
          <Card
            key={address.id}
            shadow="sm"
            p="md"
            radius="md"
            withBorder
            style={{ border: address.id == defaultAddress.id ? '2px solid var(--mantine-color-blue-5)' : undefined }}
          >
            <Group justify="space-between" mb="xs">
              <Group gap="xs">
                <IconMapPin size={16} style={{ color: 'var(--mantine-color-gray-6)' }} />
                <Text fw={500} size="sm" truncate>Address</Text>
              </Group>
              {address.id == defaultAddress.id && (
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
              {address.id != defaultAddress.id && <Button variant="light" size="xs" color="blue">Set as default</Button>}
            </Group>
          </Card>
        ))}
      </SimpleGrid>
      
      <Button variant="outline" size="sm" leftSection={<IconMapPin size={16} />} style={{ alignSelf: 'flex-start' }}>
        Add new address
      </Button>
    </Stack>
  );
}