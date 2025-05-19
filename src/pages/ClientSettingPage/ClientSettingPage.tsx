import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Modal,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconLock, IconMail, IconPhone, IconUser } from "@tabler/icons-react";
import UserNavbar from "../../components/UserNavbar";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/AuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";
import {
  ChangePasswordRequest,
  UserRequest,
  UserResponse,
} from "../../models/User";
import NotifyUtils from "../../utils/NotifyUtils";

function ClientSettingPage() {
  const { user, updateUser } = useAuthStore();
  const queryClient = useQueryClient();
  const [openedModal, setOpenedModal] = useState<
    "personal" | "phone" | "email" | "password" | null
  >(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | null
  >(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (!user) return;

    if (openedModal === "personal") setFirstName(user.firstName ?? "");
    if (openedModal === "personal") setLastName(user.lastName ?? "");
    if (openedModal === "phone") setPhone(user.phoneNumber ?? "");
    if (openedModal === "email") setEmail(user.email ?? "");
  }, [openedModal, user]);

  const updateUserMutation = useMutation({
    mutationFn: (data: UserRequest) =>
      FetchUtils.putWithToken(ResourceURL.CLIENT_USER_INFO, data),
    onSuccess: (data) => {
      const user = data as UserResponse;
      updateUser(user);
      queryClient.invalidateQueries({ queryKey: ["client-api", "me"] });
      setOpenedModal(null);
      NotifyUtils.simpleSuccess(
        "Your information has been successfully updated."
      );
    },
    onError: (error: ErrorMessage) => {
      const message =
        error?.message || "Something wrong happened. Please try again later.";
      NotifyUtils.simpleFailed(message);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordRequest) =>
      FetchUtils.postWithToken(ResourceURL.CLIENT_USER_PASSWORD, data),
    onSuccess: () => {
      NotifyUtils.simpleSuccess("Your password has been successfully updated.");
      setOpenedModal(null);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error: ErrorMessage) => {
      NotifyUtils.simpleFailed(error.message || "Failed to change password.");
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
                        Update your name
                      </Text>
                    </Stack>
                  </Group>
                  <Button
                    onClick={() => setOpenedModal("personal")}
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
                    onClick={() => setOpenedModal("phone")}
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
                    onClick={() => setOpenedModal("email")}
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
                    onClick={() => setOpenedModal("password")}
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

      {/* Modal: Personal Info */}
      <Modal
        radius="md"
        opened={openedModal === "personal"}
        onClose={() => setOpenedModal(null)}
        title={<Title order={4}>Update Personal Information</Title>}
      >
        <Stack>
          <TextInput
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="Your first name"
          />
          <TextInput
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
            placeholder="Your last name"
          />
          <Button
            radius="md"
            onClick={() =>
              updateUserMutation.mutate({
                firstName,
                lastName,
              })
            }
            loading={updateUserMutation.isPending}
          >
            Save
          </Button>
        </Stack>
      </Modal>

      {/* Modal: Phone */}
      <Modal
        radius="md"
        opened={openedModal === "phone"}
        onClose={() => setOpenedModal(null)}
        title={<Title order={4}>Update Phone Number</Title>}
      >
        <Stack>
          <TextInput
            label="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.currentTarget.value)}
            placeholder="e.g. 0123456789"
          />
          <Button
            radius="md"
            onClick={() =>
              updateUserMutation.mutate({
                phoneNumber: phone,
              })
            }
            loading={updateUserMutation.isPending}
          >
            Save
          </Button>
        </Stack>
      </Modal>

      {/* Modal: Email */}
      <Modal
        radius="md"
        opened={openedModal === "email"}
        onClose={() => setOpenedModal(null)}
        title={<Title order={4}>Update Email Address</Title>}
      >
        <Stack>
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="your-email@example.com"
            error={emailError}
          />
          <Button
            radius="md"
            onClick={() => {
              if (!isValidEmail(email)) {
                setEmailError("Invalid email format");
                return;
              }
              setEmailError(null);
              updateUserMutation.mutate({ email });
            }}
            loading={updateUserMutation.isPending}
          >
            Save
          </Button>
        </Stack>
      </Modal>

      {/* Modal: Password */}
      <Modal
        radius="md"
        opened={openedModal === "password"}
        onClose={() => setOpenedModal(null)}
        title={<Title order={4}>Change Password</Title>}
      >
        <Stack>
          <PasswordInput
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.currentTarget.value)}
            error={currentPasswordError}
          />
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
            error={newPasswordError}
          />
          <PasswordInput
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            error={confirmPasswordError}
          />
          <Button
            radius="md"
            onClick={() => {
              setCurrentPasswordError(null);
              setNewPasswordError(null);
              setConfirmPasswordError(null);

              let hasError = false;

              if (!currentPassword) {
                setCurrentPasswordError("Current password is required.");
                hasError = true;
              }

              if (!newPassword) {
                setNewPasswordError("New password is required.");
                hasError = true;
              } else if (newPassword.length < 6) {
                setNewPasswordError(
                  "New password must be at least 6 characters."
                );
                hasError = true;
              }

              if (!confirmPassword) {
                setConfirmPasswordError("Please confirm your new password.");
                hasError = true;
              } else if (newPassword !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match.");
                hasError = true;
              }

              if (hasError) return;

              changePasswordMutation.mutate({
                currentPassword,
                newPassword,
              });
            }}
            loading={changePasswordMutation.isPending}
          >
            Save
          </Button>
        </Stack>
      </Modal>
    </main>
  );
}

export default ClientSettingPage;
