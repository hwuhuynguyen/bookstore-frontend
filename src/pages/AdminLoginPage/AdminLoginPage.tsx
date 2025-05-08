import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useAdminAuthStore from "../../stores/AdminAuthStore";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { JwtResponse, LoginRequest } from "../../models/Authentication";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/apis";
import { UserResponse } from "../../models/User";
import NotifyUtils from "../../utils/NotifyUtils";

function AdminLoginPage() {
  const theme = useMantineTheme();
  const { user, updateJwtToken, updateUser, resetAuthState } =
    useAdminAuthStore();
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.trim().length == 0 ? "Username is required" : null,
      password: (value) =>
        value.trim().length == 0 ? "Password is required" : null,
    },
  });

  const loginApi = useMutation<JwtResponse, ErrorMessage, LoginRequest>({
    mutationFn: (requestBody: LoginRequest) =>
      FetchUtils.post(ResourceURL.LOGIN, requestBody),
  });

  const userInfoApi = useMutation<UserResponse, ErrorMessage>({
    mutationFn: () => FetchUtils.getWithToken(ResourceURL.CLIENT_USER_INFO, undefined, true),
  });

  const handleFormSubmit = form.onSubmit(async (formValues) => {
    if (!user) {
      const loginRequest: LoginRequest = {
        username: formValues.username,
        password: formValues.password,
      };

      try {
        const jwtResponse = await loginApi.mutateAsync(loginRequest);
        updateJwtToken(jwtResponse);
        
        const userResponse = await userInfoApi.mutateAsync();
        const isAdmin = userResponse?.roles?.some((role) => role.code === "ADMIN");
        if (!isAdmin) {
          NotifyUtils.simpleFailed("You are not authorized to access this page.");
          resetAuthState();
          return;
        }
        updateUser(userResponse);
        NotifyUtils.simpleSuccess("Login successfully!");
        navigate("/admin");
      } catch (e) {
        console.log(e);
        resetAuthState();
        NotifyUtils.simpleFailed("Login failed! Please try again.");
      }
    }
  });

  return (
    <Box style={{ backgroundColor: theme.colors.gray[1], height: "100vh" }}>
      <Container size={375} py={40}>
        <Stack align="center">
          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            radius="md"
            style={{ width: "100%" }}
          >
            <Title order={2} mb={20} style={{ textAlign: "center" }}>
              ADMIN LOGIN
            </Title>
            <form onSubmit={handleFormSubmit}>
              <TextInput
                label="Username"
                placeholder="Enter your username"
                disabled={!!user}
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                mt="md"
                disabled={!!user}
                {...form.getInputProps("password")}
              />
              <Button type="submit" fullWidth mt="xl" disabled={!!user}>
                Login
              </Button>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}

export default AdminLoginPage;
