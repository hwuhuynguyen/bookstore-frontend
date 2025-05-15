import { Container, Stack, useMantineTheme } from "@mantine/core";
import HomeBanner from "../../components/HomeBanner";
import ClientLatestBooks from "./ClientLatestBooks";
import ClientMostRatedBooks from "./ClientMostRatedBooks";
import ClientTrendingBooks from "./ClientTrendingBooks";
import ClientGreatBooksSmallPrices from "./ClientGreatBooksSmallPrices";

const HomePage = () => {
  const theme = useMantineTheme();
  return (
    <main>
      <Container size="xl">
        <Stack gap={theme.spacing.lg}>
          <HomeBanner />
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
