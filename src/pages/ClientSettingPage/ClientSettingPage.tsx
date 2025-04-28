import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconLock, IconMail, IconPhone, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";

function ClientSettingPage() {
  return (
    <main>
      <Container size="xl">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 2, sm: 1, md: 3 }}>
            <UserNavbar />
          </Grid.Col>

          <Grid.Col span={{ base: 10, sm: 11, md: 9 }}>
            <Card radius="md" shadow="sm" p="lg">
              <Stack>
                <Title order={2}>Settings</Title>

                <Group justify="space-between">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <IconUser strokeWidth={1.5} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text fw={500}>Personal information</Text>
                      <Text color="dimmed" size="sm">
                        Update your name, gender, address, and more
                      </Text>
                    </Stack>
                  </Group>
                  <Button
                    component={Link}
                    to="/user/setting/personal"
                    variant="outline"
                    radius="md"
                  >
                    Update
                  </Button>
                </Group>

                <Group justify="space-between">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <IconPhone strokeWidth={1.5} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text fw={500}>Phone number</Text>
                      <Text color="dimmed" size="sm">
                        Change your current phone number
                      </Text>
                    </Stack>
                  </Group>
                  <Button
                    component={Link}
                    to="/user/setting/phone"
                    variant="outline"
                    radius="md"
                  >
                    Update
                  </Button>
                </Group>

                <Group justify="space-between">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <IconMail strokeWidth={1.5} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text fw={500}>Email</Text>
                      <Text color="dimmed" size="sm">
                        Change your current email address
                      </Text>
                    </Stack>
                  </Group>
                  <Button
                    component={Link}
                    to="/user/setting/email"
                    variant="outline"
                    radius="md"
                  >
                    Update
                  </Button>
                </Group>

                <Group justify="space-between">
                  <Group>
                    <ThemeIcon radius="xl" size="xl" variant="light">
                      <IconLock strokeWidth={1.5} />
                    </ThemeIcon>
                    <Stack gap={0}>
                      <Text fw={500}>Password</Text>
                      <Text color="dimmed" size="sm">
                        Change your current password
                      </Text>
                    </Stack>
                  </Group>
                  <Button
                    component={Link}
                    to="/user/setting/password"
                    variant="outline"
                    radius="md"
                  >
                    Update
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientSettingPage;
