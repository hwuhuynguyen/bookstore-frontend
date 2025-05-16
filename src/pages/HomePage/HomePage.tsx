import { Container, Stack, useMantineTheme } from "@mantine/core";
import HomeBanner from "../../components/HomeBanner";
import ClientLatestBooks from "./ClientLatestBooks";
import ClientMostRatedBooks from "./ClientMostRatedBooks";
import ClientTrendingBooks from "./ClientTrendingBooks";
import ClientGreatBooksSmallPrices from "./ClientGreatBooksSmallPrices";
import ClientRecommendedForYou from "./ClientRecommendedForYouBooks";
import useAuthStore from "../../stores/AuthStore";

const HomePage = () => {
  const theme = useMantineTheme();
  const { user } = useAuthStore();
  return (
    <main>
      <Container size="xl">
        <Stack gap={theme.spacing.lg}>
          <HomeBanner />
          {user && <ClientRecommendedForYou />}
          <ClientLatestBooks />
          <ClientMostRatedBooks />
          <ClientTrendingBooks />
          <ClientGreatBooksSmallPrices />
        </Stack>
      </Container>
    </main>
  );
};

export default HomePage;
