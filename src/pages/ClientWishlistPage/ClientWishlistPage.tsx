import {
  Card,
  Container,
  Grid,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import UserNavbar from "../../components/UserNavbar";
import { useState } from "react";
import WishCard from "../../components/WishCard";
import { useQuery } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage, ListResponse } from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";
import { WishlistResponse } from "../../models/Wishlist";
import { IconAlertTriangle, IconMoodAnnoyed } from "@tabler/icons-react";

function ClientWishlistPage() {
  const theme = useMantineTheme();
  const [activePage, setActivePage] = useState(1);

  const requestParams = {
    size: 5,
    page: activePage - 1,
    sort: "createdAt,desc",
  };

  const {
    data: wishlistResponses,
    isLoading: isLoadingWishlistResponses,
    isError: isErrorWishlistResponses,
  } = useQuery<ListResponse<WishlistResponse>, ErrorMessage>({
    queryKey: ["client-api", "wishlist", "getWishlist", requestParams],
    queryFn: () =>
      FetchUtils.getWithToken<ListResponse<WishlistResponse>>(
        ResourceURL.WISHLIST_BASE,
        requestParams
      ),
    refetchOnWindowFocus: false,
  });

  const wishlist = wishlistResponses as ListResponse<WishlistResponse>;

  let wishlistContentFragment;

  if (isLoadingWishlistResponses) {
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

  if (isErrorWishlistResponses) {
    wishlistContentFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.pink[6] }}
      >
        <IconAlertTriangle size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          Error occurred while fetching data
        </Text>
      </Stack>
    );
  }

  if (wishlist && wishlist.totalElements === 0) {
    wishlistContentFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.blue[5] }}
      >
        <IconMoodAnnoyed size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          No wishlist yet
        </Text>
      </Stack>
    );
  }

  if (wishlist && wishlist.totalElements > 0) {
    wishlistContentFragment = (
      <>
        <Stack gap="xs">
          {wishlist?.data?.map((wishItem) => (
            <WishCard key={wishItem.id} wish={wishItem} />
          ))}
        </Stack>
        <Group justify="space-between" mt={theme.spacing.lg}>
          <Pagination
            value={activePage}
            total={wishlist.totalPages}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text component="span">
            Page {activePage} / {wishlist.totalPages}
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

export default ClientWishlistPage;
