import {
  Alert,
  Anchor,
  Button,
  Card,
  Container,
  Grid,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  Transition,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { IconAlertCircle } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

function RegisterPage() {
  const matches = useMediaQuery("(min-width: 992px)");

  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [openedAlert, setOpenedAlert] = useState(false);
  const [counter, setCounter] = useState(5); // Countdown for redirect
  // const [error, setError] = useState<string | null>(null);

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

  // Get inferred form values type
  type LoginForm = typeof form.values;

  // Use values type in handleSubmit function or anywhere else
  const handleFormSubmit = (values: LoginForm) => {
    setCounter(0);
    setOpenedAlert(true);
    console.log(values);
    navigate("/login");
  };

  // const loginApi = useMutation<JwtResponse, ErrorMessage, LoginRequest>(
  //   (requestBody) => FetchUtils.post(ResourceURL.LOGIN, requestBody)
  // );

  // const userInfoApi = useMutation<UserResponse, ErrorMessage>((_) =>
  //   FetchUtils.getWithToken(ResourceURL.CLIENT_USER_INFO)
  // );

  // const cartApi = useMutation<ClientCartResponse | Empty, ErrorMessage>((_) =>
  //   FetchUtils.getWithToken(ResourceURL.CLIENT_CART)
  // );

  // useEffect(() => {
  //   if (openedAlert && user && counter > 0) {
  //     setTimeout(() => setCounter(counter - 1), 1000);
  //   }

  //   if (counter === 0) {
  //     navigate("/");
  //   }
  // }, [counter, navigate, openedAlert, user]);

  // const handleFormSubmit = form.onSubmit(async (formValues) => {
  //   if (!user) {
  //     const loginRequest: LoginRequest = {
  //       username: formValues.username,
  //       password: formValues.password,
  //     };

  //     try {
  //       const jwtResponse = await loginApi.mutateAsync(loginRequest);
  //       updateJwtToken(jwtResponse.token);

  //       const userResponse = await userInfoApi.mutateAsync();
  //       updateUser(userResponse);

  //       const cartResponse = await cartApi.mutateAsync();
  //       // Reference: https://stackoverflow.com/a/136411
  //       if (Object.hasOwn(cartResponse, "cartId")) {
  //         updateCurrentCartId(cartResponse.cartId);
  //         updateCurrentTotalCartItems(cartResponse.cartItems.length);
  //       } else {
  //         updateCurrentCartId(null);
  //         updateCurrentTotalCartItems(0);
  //       }

  //       NotifyUtils.simpleSuccess("Đăng nhập thành công");
  //       setOpenedAlert(true);
  //     } catch (e) {
  //       resetAuthState();
  //       NotifyUtils.simpleFailed("Đăng nhập thất bại");
  //     }
  //   }
  // });

  return (
    <Container>
      <Transition
        mounted={openedAlert}
        transition="fade"
        duration={500}
        timingFunction="ease"
      >
        {(styles) => (
          <Alert
            style={styles}
            icon={<IconAlertCircle size={20} />}
            title="You are registered successfully!"
            color="teal"
            radius="md"
            mb="xl"
          >
            Back to homepage in {counter} seconds...
          </Alert>
        )}
      </Transition>

      <Grid justify="center" align="center">
        <Grid.Col span={{ base: 8, md: 5 }}>
          <Card
            radius={"md"}
            p={30}
            shadow={matches ? "0" : "md"}
            withBorder={matches ? false : true}
          >
            <Title order={2} mt="md" mb={30} style={{ textAlign: "center" }}>
              Register now!
            </Title>

            <form onSubmit={form.onSubmit(handleFormSubmit)}>
              <Stack>
                <TextInput
                  required
                  radius="md"
                  label="Email"
                  placeholder="Enter your email"
                  size="md"
                  disabled={!!user}
                  {...form.getInputProps("email")}
                />
                <TextInput
                  required
                  radius="md"
                  label="Username"
                  placeholder="Enter your username"
                  size="md"
                  disabled={!!user}
                  {...form.getInputProps("username")}
                />
                <PasswordInput
                  required
                  label="Password"
                  radius="md"
                  placeholder="Enter your password"
                  size="md"
                  disabled={!!user}
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  required
                  label="Confirm password"
                  radius="md"
                  placeholder="Enter your confirm password"
                  size="md"
                  disabled={!!user}
                  {...form.getInputProps("confirmPassword")}
                />
                <TextInput
                  required
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
        {matches && (
          <Grid.Col span={{ base: 0, md: 7 }}>
            <Image
              radius="md"
              src={
                "https://images.unsplash.com/photo-1701113728966-c944a6d2739e?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}

export default RegisterPage;
