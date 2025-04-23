import { AppShell, Group, Button, Text, Drawer, Burger } from "@mantine/core";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const PublicLayout = () => {
	const navigate = useNavigate();
	const [drawerOpened, setDrawerOpened] = useState(false);
	// Mock auth state - in real app, you'd use context or state management
	const isLoggedIn = false; // Replace with actual auth check

	return (
		<AppShell padding="md">
			<AppShell.Header>
				<Group justify="space-between" style={{ margin: "0 20px", padding: "10px" }}>
					<Group>
            <Burger
              opened={drawerOpened}
              onClick={() => setDrawerOpened(!drawerOpened)}
              className="md:hidden"
            />
						<Text
							size="xl"
							fw={700}
							component={Link}
							to="/"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							GraduationBookStore
						</Text>
					</Group>

					{/* Desktop navigation */}
					<div className="hidden md:flex">
						<Button variant="subtle" component={Link} to="/books">
							Browse Books
						</Button>
						<Button variant="subtle" component={Link} to="/categories">
							Categories
						</Button>
					</div>
					<div className="hidden md:flex">
						{isLoggedIn ? (
							<>
								<Button variant="subtle" component={Link} to="/profile">
									My Profile
								</Button>
								<Button variant="subtle" component={Link} to="/orders">
									My Orders
								</Button>
								<Button onClick={() => navigate("/login")}>Logout</Button>
							</>
						) : (
							<div className="flex gap-2">
								<Button variant="filled" component={Link} to="/login">
									Login
								</Button>
								<Button variant="light" component={Link} to="/register">
									Register
								</Button>
							</div>
						)}
					</div>
				</Group>
			</AppShell.Header>
			{/* Mobile drawer */}
			<Drawer
				opened={drawerOpened}
				onClose={() => setDrawerOpened(false)}
				title="Menu"
				padding="xl"
				size="sm"
			>
				<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
					<Button
						variant="subtle"
						component={Link}
						to="/books"
						onClick={() => setDrawerOpened(false)}
					>
						Browse Books
					</Button>
					<Button
						variant="subtle"
						component={Link}
						to="/categories"
						onClick={() => setDrawerOpened(false)}
					>
						Categories
					</Button>

					{isLoggedIn ? (
						<>
							<Button
								variant="subtle"
								component={Link}
								to="/profile"
								onClick={() => setDrawerOpened(false)}
							>
								My Profile
							</Button>
							<Button
								variant="subtle"
								component={Link}
								to="/orders"
								onClick={() => setDrawerOpened(false)}
							>
								My Orders
							</Button>
							<Button
								onClick={() => {
									setDrawerOpened(false);
									navigate("/login");
								}}
							>
								Logout
							</Button>
						</>
					) : (
						<>
							<Button
								variant="filled"
								component={Link}
								to="/login"
								onClick={() => setDrawerOpened(false)}
							>
								Login
							</Button>
							<Button
								variant="light"
								component={Link}
								to="/register"
								onClick={() => setDrawerOpened(false)}
							>
								Register
							</Button>
						</>
					)}
				</div>
			</Drawer>

			<AppShell.Main>
        <Outlet />
      </AppShell.Main>
		</AppShell>
	);
};

export default PublicLayout;
