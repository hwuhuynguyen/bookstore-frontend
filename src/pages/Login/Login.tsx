import {
	Alert,
	Anchor,
	Box,
	Button,
	Card,
	Container,
	PasswordInput,
	Text,
	TextInput,
	Title,
	Transition,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore";
import { useForm } from "@mantine/form";
import classes from "./Login.module.css";
import { useState } from "react";
import { IconAlertCircle } from "@tabler/icons-react";

function LoginPage() {
	// useTitle();

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
		<Container className={classes.container}>
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
						title="You are signed in successfully!"
						color="teal"
						radius="md"
						mb="xl"
					>
						Back to homepage in {counter} seconds...
					</Alert>
				)}
			</Transition>
			<Card className={classes.wrapper} radius="md" shadow="sm" p={0}>
				<Card className={classes.form} radius={0} p={30}>
					<Title order={2} mt="md" mb={30} style={{ textAlign: "center" }}>
						Welcome back!
					</Title>

					<form onSubmit={form.onSubmit(handleFormSubmit)}>
						<TextInput
							required
							radius="md"
							label="Username"
							placeholder="Enter username"
							size="md"
							disabled={!!user}
							classNames={{
								root: classes["input-root"],
							}}
							{...form.getInputProps("username")}
						/>
						<PasswordInput
							required
							label="Password"
							radius="md"
							placeholder="Enter password"
							mt="md"
							size="md"
							disabled={!!user}
							classNames={{
								root: classes["input-root"],
							}}
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
						<Anchor component={Link} to="/signup">
							Sign up now
						</Anchor>
					</Text>
				</Card>
			</Card>
		</Container>
	);
}

export default LoginPage;
