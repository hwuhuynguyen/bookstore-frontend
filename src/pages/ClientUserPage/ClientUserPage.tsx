import React from "react";
import {
  Avatar,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconHome,
  IconMail,
  IconMars,
  IconPhone,
  IconVenus,
} from "@tabler/icons-react";
import ClientUserNavbar from "../../components/ClientUserNavbar";
import useAuthStore from "../../stores/AuthStore";

function ClientUserPage() {
  const { user } = useAuthStore();

  const renderAddress = () => {
    return [
      user?.address.line,
      user?.address.ward?.name,
      user?.address.district?.name,
      user?.address.province?.name,
    ]
      .filter(Boolean)
      .join(", ");
  };

  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 2, sm: 1, md: 3 }}>
            <ClientUserNavbar />
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
                            {user?.fullname.charAt(0)}
                          </Avatar>
                          <Stack gap={0}>
                            <Text fw={500}>{user?.fullname}</Text>
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
                      <Group gap="sm" wrap="nowrap">
                        <ThemeIcon radius="xl" size="lg" variant="light">
                          <IconHome size={20} strokeWidth={1.5} />
                        </ThemeIcon>
                        <Stack gap={0}>
                          <Text fw={500}>Address</Text>
                          <Text>{renderAddress()}</Text>
                        </Stack>
                      </Group>
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
                            <Text>{user?.phone}</Text>
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
