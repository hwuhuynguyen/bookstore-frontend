import {
  Anchor,
  Button,
  Card,
  Container,
  Grid,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/apis";
import NotifyUtils from "../../utils/NotifyUtils";
import { UserRequest } from "../../models/User";
import { JwtResponse } from "../../models/Authentication";

function RegisterPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
      confirmedPassword: "",
      email: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      username: (value) =>
        value.trim().length == 0 ? "Username is required" : null,
      password: (value) =>
        value.trim().length == 0 ? "Password is required" : null,
      confirmedPassword: (value, values): string | null =>
        value.trim().length === 0
          ? "Confirm password is required"
          : value !== values.password
          ? "Password and confirm password do not match"
          : null,
      email: (value) =>
        value.trim().length === 0
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email"
          : null,
      phoneNumber: (value) =>
        value.trim().length === 0
          ? "Phone number is required"
          : !/^\d{10,15}$/.test(value)
          ? "Invalid phone number"
          : null,
      firstName: (value) =>
        value.trim().length == 0 ? "First name is required" : null,
      lastName: (value) =>
        value.trim().length == 0 ? "Last name is required" : null,
    },
  });

  const registerUserApi = useMutation<JwtResponse, ErrorMessage, UserRequest>({
    mutationFn: (requestBody) =>
      FetchUtils.post(ResourceURL.REGISTER, requestBody),
  });

  const handleFormSubmit = form.onSubmit(async (formValues) => {
    if (!user) {
      const registrationRequest: UserRequest = {
        username: formValues.username,
        password: formValues.password,
        confirmedPassword: formValues.confirmedPassword,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      };

      try {
        await registerUserApi.mutateAsync(registrationRequest);
        NotifyUtils.simpleSuccess("Sign up successfully!");
        navigate("/login", { replace: true });
      } catch (e) {
        console.log(e);
        NotifyUtils.simpleFailed("Sign up failed! Please try again.");
      }
    }
  });

  return (
    <Container>
      <Grid justify="center" align="center">
        <Grid.Col span={{ base: 8 }}>
          <Card radius={"md"} p={30} shadow={"md"} withBorder={true}>
            <Title order={2} mt="md" mb={30} style={{ textAlign: "center" }}>
              WELCOME TO BOOKREC
            </Title>
            <form onSubmit={handleFormSubmit}>
              <Stack>
                <Group grow>
                  <TextInput
                    radius="md"
                    label="First name"
                    placeholder="Enter your first name"
                    size="md"
                    disabled={!!user}
                    {...form.getInputProps("firstName")}
                  />
                  <TextInput
                    radius="md"
                    label="Last name"
                    placeholder="Enter your last name"
                    size="md"
                    disabled={!!user}
                    {...form.getInputProps("lastName")}
                  />
                </Group>
                <TextInput
                  radius="md"
                  label="Email"
                  placeholder="Enter your email"
                  size="md"
                  disabled={!!user}
                  {...form.getInputProps("email")}
                />
                <TextInput
                  radius="md"
                  label="Username"
                  placeholder="Enter your username"
                  size="md"
                  disabled={!!user}
                  {...form.getInputProps("username")}
                />

                <PasswordInput
                  label="Password"
                  radius="md"
                  placeholder="Enter your password"
                  size="md"
                  disabled={!!user}
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  label="Confirm password"
                  radius="md"
                  placeholder="Enter your confirm password"
                  size="md"
                  disabled={!!user}
                  {...form.getInputProps("confirmedPassword")}
                />
                <TextInput
                  radius="md"
                  label="Phone number"
                  placeholder="Enter your phone number"
                  size="md"
                  disabled={!!user}
                  {...form.getInputProps("phoneNumber")}
                />
                <Button
                  type="submit"
                  fullWidth
                  mt="sm"
                  size="md"
                  disabled={!!user}
                  radius="md"
                >
                  Register
                </Button>
              </Stack>
            </form>

            <Text mt="md" style={{ textAlign: "center" }}>
              Already have account?{" "}
              <Anchor component={Link} to="/login">
                Login now
              </Anchor>
            </Text>
          </Card>
        </Grid.Col>
        {/* {matches && (
          <Grid.Col span={{ base: 0, md: 7 }}>
            <Image
              radius="md"
              src={
                "https://images.unsplash.com/photo-1701113728966-c944a6d2739e?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </Grid.Col>
        )} */}
      </Grid>
    </Container>
  );
}

export default RegisterPage;
