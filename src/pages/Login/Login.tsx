import {
  Anchor,
  Box,
  Button,
  Card,
  Container,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore";
import { useForm } from "@mantine/form";
import classes from "./Login.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import { JwtResponse, LoginRequest } from "../../models/Authentication";
import ResourceURL from "../../constants/ResourceURL";
import { UserResponse } from "../../models/User";
import NotifyUtils from "../../utils/NotifyUtils";
import { HOMEPAGE } from "../../constants";
import { CartResponse } from "../../models/Cart";

function LoginPage() {
  const {
    user,
    updateJwtToken,
    updateUser,
    resetAuthState,
    updateCurrentTotalCartItems,
  } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectPath] = useState(
    location.state?.historyLocation?.pathname || HOMEPAGE
  );

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
    mutationFn: () => FetchUtils.getWithToken(ResourceURL.CLIENT_USER_INFO),
  });

  const cartApi = useMutation<CartResponse, ErrorMessage>({
    mutationFn: () => FetchUtils.getWithToken(ResourceURL.CLIENT_CART),
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

        const sortedAddresses = [...userResponse.addresses].sort((a, b) => {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });

        updateUser({ ...userResponse, addresses: sortedAddresses });

        const cartResponse = await cartApi.mutateAsync();
        updateCurrentTotalCartItems(cartResponse.cartItems.length);

        NotifyUtils.simpleSuccess("Login successfully!");
        navigate(redirectPath, { replace: true });
      } catch (e) {
        console.log(e);
        resetAuthState();
        NotifyUtils.simpleFailed("Login failed! Please try again.");
      }
    }
  });

  return (
    <Container className={classes.container}>
      <Card className={classes.wrapper} radius="md" shadow="sm" p={0}>
        <Card className={classes.form} radius={0} p={30}>
          <Title order={2} mt="md" mb={30} style={{ textAlign: "center" }}>
            Welcome back!
          </Title>

          <form onSubmit={handleFormSubmit}>
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
              mt="md"
              size="md"
              disabled={!!user}
              {...form.getInputProps("password")}
            />
            <Box mt={10}>
              <Anchor component={Link} to="/forgot" size="sm">
                Forgot password?
              </Anchor>
            </Box>
            <Button
              type="submit"
              fullWidth
              mt="sm"
              size="md"
              disabled={!!user}
              radius="md"
            >
              Sign in
            </Button>
          </form>

          <Text mt="md" style={{ textAlign: "center" }}>
            Don't have account?{" "}
            <Anchor component={Link} to="/register">
              Sign up now
            </Anchor>
          </Text>
        </Card>
      </Card>
    </Container>
  );
}

export default LoginPage;
