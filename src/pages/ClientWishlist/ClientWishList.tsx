import { Card, Container, Grid, Group, Pagination, Skeleton, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import UserNavbar from "../../components/UserNavbar";
import { useState } from "react";
import WishCard from "../../components/WishCard";

function ClientWishlist() {
  const theme = useMantineTheme()
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage]= useState(0)
  const wishes: any = [{}, {}, {}]
  let wishlistContentFragment;

  if (isLoading) {
    wishlistContentFragment = (
      <Stack>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (wishes && wishes.length > 0) {
    wishlistContentFragment = (
      <>
        <Stack>
          {wishes.map((wish: any) => <WishCard key={wish.id} wish={wish}/>)}
        </Stack>

        <Group justify="space-between" mt={theme.spacing.lg}>
          <Pagination
            total={100}
            onChange={(page: number) => (page !== activePage) && setActivePage(page)}
          />
          <Text>
            <Text component="span">Page {activePage}</Text>
            <span> / {100}</span>
          </Text>
        </Group>
      </>
    );
  }

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
                <Title order={2}>Wishlist</Title>

                {wishlistContentFragment}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

export default ClientWishlist;
